export function exportFavoritesCsv(favorites) {
  const header = ["id", "name", "region", "createdAt"];
  const rows = favorites.map((f) => [
    f.id || "",
    f.name || "",
    f.region || "",
    f.createdAt ? new Date(f.createdAt).toISOString() : "",
  ]);

  const toCsvLine = (arr) =>
    arr.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",");

  const csv = [toCsvLine(header), ...rows.map(toCsvLine)].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "favoritos.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
