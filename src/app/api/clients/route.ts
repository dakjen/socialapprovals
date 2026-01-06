import { NextResponse } from 'next/server';
import { db } from '@/db';
import { clients, users } from '@/db/schema'; // Import clients and users
import { eq } from 'drizzle-orm';

// GET all clients
export async function GET() {
  try {
    const allClients = await db.select().from(clients);
    return NextResponse.json(allClients, { status: 200 });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

// POST a new client
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, name, company, industry } = body;

    if (!userId || !name || !company) {
      return NextResponse.json({ error: 'Missing required fields: userId, name, company' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.id, parseInt(userId))).limit(1);
    if (existingUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if client with the same name and company for this user already exists
    const existingClient = await db.select().from(clients).where(
      eq(clients.userId, parseInt(userId)) && eq(clients.name, name) && eq(clients.company, company)
    ).limit(1);

    if (existingClient.length > 0) {
      return NextResponse.json({ error: 'Client with this user, name, and company already exists' }, { status: 409 });
    }

    const newClient = await db.insert(clients).values({
      userId: parseInt(userId),
      name,
      company,
      industry,
    }).returning();

    return NextResponse.json(newClient[0], { status: 201 });

  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
