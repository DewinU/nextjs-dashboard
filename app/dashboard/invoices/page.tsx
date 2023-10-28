export default async function Page() {
  console.log("Loading Invoices Page")
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Invoices Page Loaded")
  return <p>Invoices Page</p>;
  }