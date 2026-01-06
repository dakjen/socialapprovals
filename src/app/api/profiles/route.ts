import { NextResponse } from 'next/server';
import { db } from '@/db';
import { profiles, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { put } from '@vercel/blob'; // Import Vercel Blob put function

// GET all social media profiles
export async function GET() {
  try {
    const allProfiles = await db.select().from(profiles);
    return NextResponse.json(allProfiles, { status: 200 });
  } catch (error) {
    console.error('Error fetching social media profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch social media profiles' }, { status: 500 });
  }
}

// POST a new social media profile with file upload
export async function POST(req: Request) {
  try {
    if (!req.body) {
      return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
    }

    const formData = await req.formData();
    
    const userId = formData.get('userId')?.toString();
    const platform = formData.get('platform')?.toString();
    const username = formData.get('username')?.toString();
    const profilePicFile = formData.get('profilePic') as File | null;
    let profilePicUrl: string | null = null;

    if (!userId || !platform || !username) {
      return NextResponse.json({ error: 'Missing required fields: userId, platform, username' }, { status: 400 });
    }

    // Upload profile picture to Vercel Blob
    if (profilePicFile) {
      const blob = await put(profilePicFile.name, profilePicFile, {
        access: 'public',
        addRandomSuffix: true,
      });
      profilePicUrl = blob.url;
    }

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.id, parseInt(userId))).limit(1);
    if (existingUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if a profile with the same user, platform, and username already exists
    const existingProfile = await db.select().from(profiles).where(
      eq(profiles.userId, parseInt(userId)) && eq(profiles.platform, platform) && eq(profiles.username, username)
    ).limit(1);

    if (existingProfile.length > 0) {
      return NextResponse.json({ error: 'Profile with this user, platform, and username already exists' }, { status: 409 });
    }

    const newProfile = await db.insert(profiles).values({
      userId: parseInt(userId),
      platform,
      username,
      profilePicUrl,
    }).returning();

    return NextResponse.json(newProfile[0], { status: 201 });

  } catch (error) {
    console.error('Error creating social media profile:', error);
    return NextResponse.json({ error: 'Failed to create social media profile' }, { status: 500 });
  }
}
