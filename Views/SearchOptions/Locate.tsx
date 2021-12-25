const baseUrl = "https://trave-api.herokuapp.com/api/v1/";

export const locate = async (
  endpoint: string,
  latitude: number,
  longitude: number,
  type?: "SOURCE" | "DESTINATION"
) => {
  const params: {
    latitude: string;
    longitude: string;
    type?: "source" | "destination";
  } = { latitude: latitude.toString(), longitude: longitude.toString() };
  if (type) {
    params.type = type.toLowerCase() as "source" | "destination";
  }
  const req = await fetch(`${baseUrl}${endpoint}?${new URLSearchParams(params)}`);
  return await req.json();
};
