import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gift from '@/models/Gift';
import mongoose from 'mongoose';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid gift ID' }, { status: 400 });
    }

    // Atomically update only if currently closed
    const updatedGift = await Gift.findOneAndUpdate(
      {
        _id: id,
        opened: false, // Only update if currently closed
      },
      {
        opened: true,
        opened_at: new Date(),
      },
      {
        new: true, // Return the updated document
        lean: true,
      }
    );

    if (!updatedGift) {
      // Gift not found or already opened - check which case
      const existingGift = await Gift.findById(id).lean();

      if (!existingGift) {
        return NextResponse.json({ error: 'Gift not found' }, { status: 404 });
      }

      // Gift already opened, return the existing gift
      return NextResponse.json(existingGift);
    }

    return NextResponse.json(updatedGift);
  } catch (error) {
    console.error('Error opening gift:', error);
    return NextResponse.json({ error: 'Failed to open gift' }, { status: 500 });
  }
}
