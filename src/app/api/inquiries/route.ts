import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID!;

// POST - Public inquiry submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message, lead_type, custom_fields, utm_source } = body;

    if (!name) {
      return NextResponse.json({ message: '이름은 필수입니다.' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('kmm59_inquiries')
      .insert({
        site_id: SITE_ID,
        name,
        phone: phone || null,
        email: email || null,
        message: message || null,
        lead_type: lead_type || 'consultation',
        status: 'pending',
        is_read: false,
        custom_fields: custom_fields || null,
        utm_source: utm_source || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Inquiry insert error:', error);
      return NextResponse.json({ message: '문의 등록에 실패했습니다.', detail: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error('Inquiry POST error:', err);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.', detail: String(err) }, { status: 500 });
  }
}

// GET - Admin only: list inquiries
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const isRead = searchParams.get('is_read');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('kmm59_inquiries')
      .select('*', { count: 'exact' })
      .eq('site_id', SITE_ID)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) query = query.eq('status', status);
    if (isRead !== null && isRead !== undefined && isRead !== '') {
      query = query.eq('is_read', isRead === 'true');
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Inquiry GET error:', error);
      return NextResponse.json({ message: '문의 목록을 불러올 수 없습니다.' }, { status: 500 });
    }

    return NextResponse.json({ data, total: count, page, limit });
  } catch (err) {
    console.error('Inquiry GET error:', err);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// PATCH - Admin only: update inquiry (is_read, status)
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();
    const { id, is_read, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID가 필요합니다.' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (is_read !== undefined) updateData.is_read = is_read;
    if (status !== undefined) updateData.status = status;

    const { data, error } = await supabase
      .from('kmm59_inquiries')
      .update(updateData)
      .eq('id', id)
      .eq('site_id', SITE_ID)
      .select()
      .single();

    if (error) {
      console.error('Inquiry PATCH error:', error);
      return NextResponse.json({ message: '업데이트에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error('Inquiry PATCH error:', err);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE - Admin only: delete inquiry
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID가 필요합니다.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('kmm59_inquiries')
      .delete()
      .eq('id', id)
      .eq('site_id', SITE_ID);

    if (error) {
      console.error('Inquiry DELETE error:', error);
      return NextResponse.json({ message: '삭제에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '삭제되었습니다.' });
  } catch (err) {
    console.error('Inquiry DELETE error:', err);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
