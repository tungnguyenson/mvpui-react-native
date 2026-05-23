import {
  Avatar,
  Badge,
  EmptyState,
  List,
  ListItem,
  SearchBar,
  SegmentedControl,
  type SegmentedControlOption,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { Search } from "lucide-react-native"
import { useState } from "react"
import { ScrollView, View } from "react-native"

type FilterValue = "all" | "people" | "posts" | "tags"

const FILTER_OPTIONS: SegmentedControlOption<FilterValue>[] = [
  { value: "all", label: "All" },
  { value: "people", label: "People" },
  { value: "posts", label: "Posts" },
  { value: "tags", label: "Tags" },
]

type Person = { id: string; name: string; handle: string; avatar: string; badge?: string }

const PEOPLE: Person[] = [
  { id: "1", name: "Olivia Rhye", handle: "@olivia_rhye", avatar: "https://i.pravatar.cc/200?img=47", badge: "Pro" },
  { id: "2", name: "Lana Steiner", handle: "@lana_steiner", avatar: "https://i.pravatar.cc/200?img=23" },
  { id: "3", name: "Phoenix Baker", handle: "@phoenix", avatar: "https://i.pravatar.cc/200?img=11", badge: "Pro" },
  { id: "4", name: "Candice Wu", handle: "@candice", avatar: "https://i.pravatar.cc/200?img=5" },
  { id: "5", name: "Drew Cano", handle: "@drew", avatar: "https://i.pravatar.cc/200?img=33" },
  { id: "6", name: "Orlando Diggs", handle: "@orlando", avatar: "https://i.pravatar.cc/200?img=15" },
  { id: "7", name: "Ava Wright", handle: "@ava_w", avatar: "https://i.pravatar.cc/200?img=9", badge: "New" },
]

export default function SearchScreen() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterValue>("all")

  const showPeople = filter === "all" || filter === "people"
  const filtered = query.length > 0
    ? PEOPLE.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.handle.toLowerCase().includes(query.toLowerCase()),
      )
    : []
  const hasPeopleResults = showPeople && filtered.length > 0
  const noResults = query.length > 0 && !hasPeopleResults

  return (
    <View className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Search / Discover", headerShown: true }} />

      <View className="px-5 pt-3 pb-2 gap-3">
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search people, posts, tags…"
          showCancel={query.length > 0}
          onCancel={() => setQuery("")}
        />
        <SegmentedControl
          value={filter}
          onChange={setFilter}
          options={FILTER_OPTIONS}
          accessibilityLabel="Filter results"
        />
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        {query.length === 0 ? (
          <View className="flex-1 items-center justify-center px-8 pt-16">
            <EmptyState
              icon={<Search size={32} />}
              title="Find anyone"
              description="Search by name, handle, or topic."
            />
          </View>
        ) : noResults ? (
          <View className="flex-1 items-center justify-center px-8 pt-16">
            <EmptyState
              title="No results"
              description={`Nothing matched "${query}". Try a different search.`}
            />
          </View>
        ) : (
          <List className="px-5 mt-2">
            {showPeople && filtered.length > 0 && (
              <View>
                {filtered.map((person) => (
                  <ListItem
                    key={person.id}
                    leading={
                      <Avatar
                        src={person.avatar}
                        alt={person.name}
                        size="sm"
                      />
                    }
                    title={person.name}
                    subtitle={person.handle}
                    trailing={
                      person.badge ? (
                        <Badge color="brand" size="sm">{person.badge}</Badge>
                      ) : undefined
                    }
                    onPress={() => {}}
                  />
                ))}
              </View>
            )}
          </List>
        )}
      </ScrollView>
    </View>
  )
}
