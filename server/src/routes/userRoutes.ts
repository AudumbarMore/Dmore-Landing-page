import { Router } from 'express';
import { z } from 'zod';
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
} from '../services/userService';
import { authenticate, requireAdmin } from '../middleware/auth';
import { toCsv } from '../utils/csv';

const router = Router();

// Extended schema with subscription fields
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  role: z.enum(['admin', 'user']),
  domain: z.string().optional(),
  numberOfUsers: z.number().int().positive().optional(),
  planType: z.enum(['basic', 'pro']).optional(),
  subscriptionDuration: z.enum(['monthly', 'quarterly', '6months', '1year']).optional(),
  accountStatus: z.enum(['active', 'disabled']).optional(),
  renewalDate: z.string().optional(),
});

// For updates, all fields are optional (including password)
const updateSchema = userSchema.partial();

const sanitizeUser = (user: { password?: string; [key: string]: unknown }) => {
  const { password, ...rest } = user;
  return rest;
};

router.use(authenticate, requireAdmin);

router.get('/', async (_req, res) => {
  const users = await listUsers();
  return res.json({ users });
});

router.post('/', async (req, res) => {
  try {
    const body = userSchema.parse(req.body);
    // Require password for new user creation
    if (!body.password) {
      return res.status(400).json({ message: 'Password is required for new users' });
    }
    const user = await createUser(body);
    return res.status(201).json({ user: sanitizeUser(user) });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create user';
    return res.status(400).json({ message });
  }
});

router.get('/export/csv', async (_req, res) => {
  const users = await listUsers();
  const csv = toCsv(
    users.map((user: Awaited<ReturnType<typeof listUsers>>[number]) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      domain: user.domain,
      planType: user.planType,
      accountStatus: user.accountStatus,
      createdAt: user.createdAt,
    }))
  );

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');
  return res.send(csv);
});

router.put('/:id', async (req, res) => {
  try {
    const body = updateSchema.parse(req.body);
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await updateUser(id, body);
    return res.json({ user: user ? sanitizeUser(user) : null });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update user';
    return res.status(400).json({ message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Invalid user id' });
  }

  await deleteUser(id);
  return res.status(204).send();
});

export default router;
