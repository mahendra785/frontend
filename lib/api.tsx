export const api = {
  get: (path: string) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`).then((r) => r.json()),

  postForm: (path: string, formData: FormData) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method: "POST",
      body: formData,
    }).then((r) => r.json()),
};
