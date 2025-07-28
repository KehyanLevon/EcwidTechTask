export function loadEcwidScript({
  id = "ecwid-script",
  onLoad,
}: {
  id?: string;
  onLoad?: () => void;
}) {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.src = `https://app.ecwid.com/script.js?${
    import.meta.env.VITE_ECWID_STORE_ID
  }&data_platform=code&data_date=${new Date().toISOString().slice(0, 10)}`;
  script.async = true;
  script.id = id;

  if (onLoad) script.onload = onLoad;

  document.body.appendChild(script);
}
