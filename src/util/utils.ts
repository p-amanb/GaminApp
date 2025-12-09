const uriToFile = (uri: string, fileName: string) => {
  // Try to extract extension
  const ext = uri.split(".").pop();
  const mimeType = ext ? `image/${ext}` : "image/jpeg";

  return {
    uri,
    type: mimeType,
    name: fileName,
  };
};

export { uriToFile };

