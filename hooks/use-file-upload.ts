export function useFileUpload() {
  return async (filename: string, file: File) => {
    const result = await fetch(`/api/upload?file=${filename}`, {
      method: 'POST',
    });
    const response = await result.json();
    console.log(response);
    const { url, fields } = response;

    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    const upload = await fetch(url, {
      // CORS
      // REFER: https://velog.io/@treejy/Google-Cloud-Storage-%EB%B2%84%ED%82%B7%EC%97%90-CORS-%EA%B0%80%EB%8A%A5%ED%95%98%EB%8F%84%EB%A1%9D-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
      method: 'POST',
      body: formData,
    });
    return { ok: upload.ok, filepath: `${url}${fields.key}` };
  };
}
