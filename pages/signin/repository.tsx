import useSWR from "swr";

export class Repository {
  static Auth = async (val: { email: string; password: string }) => {
    const response = await fetch("http://localhost:4000/api/v1/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(val),
    });
    const data = response.json();

    return data;
  };
}
