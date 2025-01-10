import { useAuth } from "@/providers/AuthProvider";
import { ResourceMetadata, ResourceType } from "./resourceTypes";
import { redirect } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase";
import { queryClient } from "@/providers/QueryProvider";
import { queryKeystore } from "../queryKeystore";

export type CreateResourceDocumentRequest = {
  url: string;
  userMetadata: ResourceMetadata;
  type: ResourceType;
};

export type CreateResourceDocumentResponse = {
  success: boolean;
};

const createResource = httpsCallable<
  CreateResourceDocumentRequest,
  CreateResourceDocumentResponse
>(functions, "createResourceDocument");

export function useCreateResource({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback?: () => void;
  onErrorCallback?: (error: Error) => void;
}) {
  const { user } = useAuth();
  if (!user) {
    redirect("/login");
  }

  return useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeystore.baseRecentResources(user.uid),
      });
      onSuccessCallback?.();
    },
    onError: (error) => {
      onErrorCallback?.(error);
    },
  });
}
