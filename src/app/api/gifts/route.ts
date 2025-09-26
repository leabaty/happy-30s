import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gift from '@/models/Gift';

export async function GET() {
  try {
    await dbConnect();

    const gifts = await Gift.find({}).sort({ order: 1 }).lean();

    return NextResponse.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    return NextResponse.json({ error: 'Failed to fetch gifts' }, { status: 500 });
  }
}
