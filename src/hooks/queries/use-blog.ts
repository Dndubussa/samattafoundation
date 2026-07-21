import { useQuery } from "@tanstack/react-query";
import { blogApi } from "@/lib/api";
import { queryKeys } from "@/hooks/queries/keys";

export function useBlogPosts(limit = 10) {
  return useQuery({
    queryKey: queryKeys.blog.posts(limit),
    queryFn: () => blogApi.getPosts(limit),
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.blog.post(slug ?? ""),
    queryFn: () => blogApi.getPostBySlug(slug!),
    enabled: Boolean(slug),
  });
}
