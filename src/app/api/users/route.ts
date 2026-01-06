import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema'; // Changed from profiles to users
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs'; // Import bcryptjs

// GET all users
export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    // Do not return passwordHash to the client
    const safeUsers = allUsers.map(({ passwordHash, ...rest }) => rest);
    return NextResponse.json(safeUsers, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('API: Received POST request to /api/users with body:', body); // Log incoming body
    const { name, email, password, role = 'user' } = body; // Receive password

    if (!name || !email || !password) {
      console.error('API: Missing required fields'); // Log error
      return NextResponse.json({ error: 'Missing required fields: name, email, password' }, { status: 400 });
    }

    // Check if user with this name or email already exists
    const existingUser = await db.select().from(users).where(eq(users.name, name)).limit(1);
    if (existingUser.length > 0) {
      console.error('API: User with this name already exists'); // Log error
      return NextResponse.json({ error: 'User with this name already exists' }, { status: 409 });
    }
    const existingEmail = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingEmail.length > 0) {
      console.error('API: Profile with this email already exists'); // Log error
      return NextResponse.json({ error: 'Profile with this email already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = await db.insert(users).values({
      name,
      email,
      passwordHash: hashedPassword, // Save hashed password
      role,
    }).returning(); // .returning() is for PostgreSQL

    console.log('API: New user created:', newUser[0]); // Log successful creation
    // Do not return passwordHash to the client
    const { passwordHash, ...rest } = newUser[0];
    return NextResponse.json(rest, { status: 201 });

  } catch (error) {
    console.error('API: Error creating user:', error); // Log detailed error
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}


// DELETE a user
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    const deletedUser = await db.delete(users).where(eq(users.id, parseInt(id))).returning();

    if (deletedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: deletedUser[0] }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

// PATCH to update a user (e.g., role)
export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();
    const { role } = body;

    if (!id || !role) {
      return NextResponse.json({ error: 'Missing user ID or role' }, { status: 400 });
    }

    // TODO: Implement admin check here later

    const updatedUser = await db.update(users).set({ role }).where(eq(users.id, parseInt(id))).returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser[0] }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}



