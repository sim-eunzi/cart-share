/**
 * API Integration Test Script
 * Usage: npx tsx scripts/test-api.ts
 * Ensure 'npm run dev' is running before executing this script.
 */

const BASE_URL = 'http://localhost:3000';
const FINGERPRINT = 'dev-test-fingerprint';

async function testFlow() {
  console.log('🏁 Starting API Integration Test...');

  try {
    // 1. Create Cart
    console.log('\n[1/5] Creating Cart...');
    const createRes = await fetch(`${BASE_URL}/api/carts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `fingerprint=${FINGERPRINT}`
      },
      body: JSON.stringify({ title: 'My Awesome Test Cart' }),
    });
    
    if (!createRes.ok) throw new Error(`Create failed: ${await createRes.text()}`);
    const { cartId } = await createRes.json();
    console.log(`✅ Cart created! ID: ${cartId}`);

    // 2. Add Item (OG Test)
    console.log('\n[2/5] Adding Item (Apple KR)...');
    const addItemRes = await fetch(`${BASE_URL}/api/carts/${cartId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `fingerprint=${FINGERPRINT}`
      },
      body: JSON.stringify({ url: 'https://www.apple.com/kr/iphone-16-pro/' }),
    });
    
    if (!addItemRes.ok) throw new Error(`Add item failed: ${await addItemRes.text()}`);
    const { item } = await addItemRes.json();
    console.log(`✅ Item added! Title: "${item.title}"`);
    const itemId = item.id;

    // 3. Get Cart (Public Access)
    console.log('\n[3/5] Fetching Cart...');
    const getRes = await fetch(`${BASE_URL}/api/carts/${cartId}`);
    
    if (!getRes.ok) throw new Error(`Fetch failed: ${await getRes.text()}`);
    const cartData = await getRes.json();
    console.log(`✅ Cart fetched! Items count: ${cartData.items.length}`);

    // 4. Remove Item
    console.log('\n[4/5] Removing Item...');
    const removeRes = await fetch(`${BASE_URL}/api/carts/${cartId}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Cookie': `fingerprint=${FINGERPRINT}`
      },
    });
    
    if (!removeRes.ok) throw new Error(`Remove item failed: ${await removeRes.text()}`);
    console.log('✅ Item removed successfully.');

    // 5. Delete Cart
    console.log('\n[5/5] Deleting Cart...');
    const deleteRes = await fetch(`${BASE_URL}/api/carts/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Cookie': `fingerprint=${FINGERPRINT}`
      },
    });
    
    if (!deleteRes.ok) throw new Error(`Delete failed: ${await deleteRes.text()}`);
    console.log('✅ Cart deleted successfully.');

    console.log('\n🎉 API Integration Test Passed Successfully!');
  } catch (error: any) {
    console.error('\n❌ Test Failed:', error.message);
    process.exit(1);
  }
}

testFlow();
