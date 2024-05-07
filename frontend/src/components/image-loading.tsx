import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface ImageLoadingProps {
  baseUri: string;
  token: string;
}

const ImageLoading = ({ baseUri, token }: ImageLoadingProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["image", baseUri, token],
    queryFn: () => {
      return fetch(`http://localhost:4000/${baseUri}?token=${token}`).then(
        async (res) => {
          if (res.status !== 200) {
            throw new Error("Failed to load image");
          }
          const blob = await res.blob();
          return URL.createObjectURL(blob);
        }
      );
    },
    refetchOnWindowFocus: false,
  });
  if (isPending)
    return (
      <div className="h-screen flex items-center justify-center">
        <TailSpin />
      </div>
    );
  if (error)
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  return (
    <Image src={data} alt={token} loading="lazy" width={300} height={300} />
  );
};

export default ImageLoading;
