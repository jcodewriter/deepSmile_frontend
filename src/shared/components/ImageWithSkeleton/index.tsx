import { Image, Skeleton, ImageProps } from "@chakra-ui/core";
import { useState } from "react";

const ImageWithSkeleton = ({ src, ...imageProps }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { maxW, maxH } = imageProps;

  return (
    <Skeleton isLoaded={isLoaded} w={maxW ?? "100%"} h={maxH ?? "100%"} maxW="100%">
      <Image
        src={src}
        {...imageProps}
        w="100%"
        h="100%"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsLoaded(true);
          setIsError(true);
        }}
        fallbackSrc={"/img/placeholder.png"}
        ignoreFallback={isLoaded && !isError ? true : false}
      />
    </Skeleton>
  );
};

export default ImageWithSkeleton;
