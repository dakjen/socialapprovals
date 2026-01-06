import { NextResponse } from 'next/server';
import { db } from '@/db';
import { posts, profiles } from '@/db/schema'; // Import profiles table
import { eq } from 'drizzle-orm';
import { put } from '@vercel/blob';

export async function GET() {
  console.log('API /api/posts GET handler started');
  try {
    const allPosts = await db
      .select({
        id: posts.id,
        caption: posts.caption,
        imageUrls: posts.imageUrls,
        date: posts.postDate,
        profile: {
          username: profiles.username,
          profilePicUrl: profiles.profilePicUrl,
        },
      })
      .from(posts)
      .leftJoin(profiles, eq(posts.profileId, profiles.id));

    console.log('API /api/posts successfully fetched posts:', allPosts);
    return NextResponse.json({ posts: allPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  console.log('API /api/posts POST handler started');
  try {
    const formData = await req.formData();
    console.log('API /api/posts received formData');
    const profileId = formData.get('profileId')?.toString();
    const caption = formData.get('caption')?.toString();
    const date = formData.get('date')?.toString();
    const imageFiles = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    if (!profileId || !caption || !date) {
      console.error('API /api/posts missing required fields');
      return NextResponse.json({ error: 'Missing required fields: profileId, caption, date' }, { status: 400 });
    }

    // Verify if profileId exists
    const existingProfile = await db.select().from(profiles).where(eq(profiles.id, parseInt(profileId))).limit(1);
    if (existingProfile.length === 0) {
      console.error('API /api/posts social media profile not found');
      return NextResponse.json({ error: 'Social media profile not found' }, { status: 404 });
    }

    // Upload images to Vercel Blob
    for (const imageFile of imageFiles) {
      const blob = await put(imageFile.name, imageFile, {
        access: 'public',
        addRandomSuffix: true,
      });
      imageUrls.push(blob.url);
    }
    console.log('API /api/posts successfully uploaded images:', imageUrls);

    const newPost = await db.insert(posts).values({
      profileId: parseInt(profileId),
      caption,
      postDate: new Date(date),
      imageUrls: imageUrls,
    }).returning();
    console.log('API /api/posts successfully inserted new post:', newPost[0]);

    return NextResponse.json({ success: true, post: newPost[0] }, { status: 201 });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  console.log('API /api/posts DELETE handler started');
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log('API /api/posts deleting post with id:', id);

    if (!id) {
      return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
    }

    const deletedPost = await db.delete(posts).where(eq(posts.id, parseInt(id))).returning();

    if (deletedPost.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log('API /api/posts successfully deleted post:', deletedPost[0]);
    return NextResponse.json({ success: true, post: deletedPost[0] }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
