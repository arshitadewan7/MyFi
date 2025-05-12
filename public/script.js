async function fetchStock() {
  const symbol = document.getElementById('symbol').value;
  const response = await fetch(`/api/stock/${symbol}`);
  const data = await response.json();
  document.getElementById('result').textContent = JSON.stringify(data, null, 2);
}
