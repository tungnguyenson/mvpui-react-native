import {
  Avatar,
  Badge,
  Button,
  ListSection,
  SearchBar,
  Skeleton,
  SwipeableRow,
  usePullToRefresh,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Archive, Heart, MessageCircle, Share2, Trash2 } from "lucide-react-native"
import { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"

type Post = {
  id: string
  author: string
  handle: string
  avatar: string
  time: string
  body: string
  likes: number
  comments: number
}

const POSTS: Post[] = [
  {
    id: "1",
    author: "Olivia Rhye",
    handle: "@olivia_rhye",
    avatar: "https://i.pravatar.cc/200?img=47",
    time: "2m ago",
    body: "Just shipped a new design system update. The token pipeline is finally automated end-to-end. 🎉",
    likes: 142,
    comments: 18,
  },
  {
    id: "2",
    author: "Lana Steiner",
    handle: "@lana_steiner",
    avatar: "https://i.pravatar.cc/200?img=23",
    time: "15m ago",
    body: "Hot take: the best UX decisions are the boring ones. No magic, no cleverness — just clarity.",
    likes: 87,
    comments: 34,
  },
  {
    id: "3",
    author: "Phoenix Baker",
    handle: "@phoenix",
    avatar: "https://i.pravatar.cc/200?img=11",
    time: "1h ago",
    body: "Accessibility isn't a checkbox. It's the foundation. Build it in from day one or pay the tax later.",
    likes: 204,
    comments: 9,
  },
  {
    id: "4",
    author: "Candice Wu",
    handle: "@candice",
    avatar: "https://i.pravatar.cc/200?img=5",
    time: "3h ago",
    body: "After 6 months of async-first work, I can't imagine going back to synchronous collaboration. The focus is real.",
    likes: 61,
    comments: 22,
  },
  {
    id: "5",
    author: "Drew Cano",
    handle: "@drew",
    avatar: "https://i.pravatar.cc/200?img=33",
    time: "5h ago",
    body: "React Native in 2025 is genuinely great. The pain points that kept me away two years ago are mostly gone.",
    likes: 318,
    comments: 47,
  },
]

function PostSkeleton() {
  return (
    <View className="px-5 py-4 gap-3 border-b border-border">
      <View className="flex-row gap-3 items-center">
        <Skeleton shape="circle" width={40} height={40} />
        <View className="gap-1.5 flex-1">
          <Skeleton shape="text" width={120} height={14} />
          <Skeleton shape="text" width={80} height={12} />
        </View>
      </View>
      <Skeleton shape="rect" width="100%" height={16} />
      <Skeleton shape="rect" width="70%" height={16} />
    </View>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <SwipeableRow
      leftActions={[
        {
          key: "archive",
          label: "Archive",
          icon: Archive,
          color: "primary",
          onPress: () => {},
        },
      ]}
      rightActions={[
        {
          key: "delete",
          label: "Delete",
          icon: Trash2,
          color: "destructive",
          onPress: () => {},
        },
      ]}
    >
      <View className="px-5 py-4 gap-3 bg-bg border-b border-border">
        <View className="flex-row items-center gap-3">
          <Avatar src={post.avatar} alt={post.author} size="md" />
          <View className="flex-1 gap-0.5">
            <Text className="text-fg text-md font-semibold">{post.author}</Text>
            <Text className="text-fg-tertiary text-sm">{post.handle} · {post.time}</Text>
          </View>
        </View>
        <Text className="text-fg text-md leading-6">{post.body}</Text>
        <View className="flex-row gap-4">
          <Button color="tertiary" size="sm" iconLeading={Heart} onPress={() => {}}>
            {post.likes.toString()}
          </Button>
          <Button color="tertiary" size="sm" iconLeading={MessageCircle} onPress={() => {}}>
            {post.comments.toString()}
          </Button>
          <Button color="tertiary" size="sm" iconLeading={Share2} onPress={() => {}} />
        </View>
      </View>
    </SwipeableRow>
  )
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export default function FeedScreen() {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const t = setTimeout(() => {
      setPosts(POSTS)
      setIsInitialLoad(false)
    }, 800)
    return () => clearTimeout(t)
  }, [])

  const { refreshControl } = usePullToRefresh(async () => {
    await delay(1000)
    setPosts([...POSTS].reverse())
  })

  return (
    <View className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Feed / Home", headerShown: true }} />

      <SearchBar placeholder="Search posts…" className="mx-5 my-3" value="" onChangeText={() => {}} />

      <ScrollView refreshControl={refreshControl}>
        {isInitialLoad ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </ScrollView>
    </View>
  )
}
