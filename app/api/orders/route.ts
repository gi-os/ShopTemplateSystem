import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  boxCost: number;
  unitsPerBox: number;
  quantity: number;
}

interface OrderData {
  name: string;
  email: string;
  phone: string;
  company: string;
  shippingAddress: string;
  freightOption: string;
  freightCompany: string;
  freightAccount: string;
  freightContact: string;
  orderNotes: string;
  items: OrderItem[];
  total: number;
}

function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
}

function escapeCSVField(field: string): string {
  if (!field) return '';
  // If field contains comma, quote, or newline, wrap in quotes and escape quotes
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();

    // Validate required fields
    if (!orderData.name || !orderData.email || !orderData.phone || !orderData.company || !orderData.shippingAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      );
    }

    const orderId = generateOrderId();
    const orderDate = new Date().toISOString();

    // Format items as JSON string for CSV
    const itemsJson = JSON.stringify(orderData.items);

    // Prepare freight info
    const freightInfo = orderData.freightOption === 'own'
      ? `Own: ${orderData.freightCompany} (${orderData.freightAccount}) - ${orderData.freightContact}`
      : 'LR Paris';

    // Create CSV row
    const csvRow = [
      escapeCSVField(orderId),
      escapeCSVField(orderDate),
      escapeCSVField(orderData.name),
      escapeCSVField(orderData.email),
      escapeCSVField(orderData.phone),
      escapeCSVField(orderData.company),
      escapeCSVField(orderData.shippingAddress),
      escapeCSVField(freightInfo),
      escapeCSVField(orderData.freightCompany),
      escapeCSVField(orderData.freightAccount),
      escapeCSVField(orderData.freightContact),
      escapeCSVField(orderData.orderNotes),
      escapeCSVField(itemsJson),
      escapeCSVField(orderData.total.toFixed(2)),
    ].join(',');

    // Append to orders.csv
    const ordersPath = path.join(process.cwd(), 'DATABASE', 'Orders', 'orders.csv');

    // Ensure the directory exists
    const ordersDir = path.dirname(ordersPath);
    if (!fs.existsSync(ordersDir)) {
      fs.mkdirSync(ordersDir, { recursive: true });
    }

    // Append the order
    fs.appendFileSync(ordersPath, csvRow + '\n', 'utf-8');

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Order submitted successfully',
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
