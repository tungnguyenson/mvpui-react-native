import { Card, CardContent, CardDescription, CardHeader, CardTitle, Image, SafeArea } from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { ScrollView, Text, View } from "react-native"

const REMOTE = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
const REMOTE_PORTRAIT = "https://i.pravatar.cc/300?img=22"

// Tiny blurhash for the unsplash hero (33 chars).
const BLURHASH_HERO = "L9CY{=00Mx_3-:~qWBax9Z%MaeWB"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-fg text-lg font-semibold">{title}</Text>
      <View className="gap-3">{children}</View>
    </View>
  )
}

export default function ImageShowcase() {
  return (
    <SafeArea>
      <Stack.Screen options={{ title: "Image", headerShown: true }} />
      <ScrollView contentContainerClassName="px-5 py-6 gap-8">
        <Section title="Default — cover fit, 200ms fade transition">
          <View className="overflow-hidden rounded-xl">
            <Image
              source={{ uri: REMOTE }}
              style={{ width: "100%", height: 200 }}
              alt="Mountain landscape"
            />
          </View>
        </Section>

        <Section title="With blurhash placeholder">
          <View className="overflow-hidden rounded-xl">
            <Image
              source={{ uri: REMOTE }}
              blurhash={BLURHASH_HERO}
              style={{ width: "100%", height: 200 }}
              alt="Mountain landscape with blurhash"
            />
          </View>
        </Section>

        <Section title="Square portrait — circle radius via className">
          <View className="flex-row gap-4 items-center">
            <Image
              source={{ uri: REMOTE_PORTRAIT }}
              style={{ width: 80, height: 80, borderRadius: 40 }}
              alt="Portrait"
            />
            <Image
              source={{ uri: REMOTE_PORTRAIT }}
              style={{ width: 80, height: 80, borderRadius: 12 }}
              alt="Portrait rounded"
            />
          </View>
        </Section>

        <Section title="contentFit options">
          <View className="gap-3">
            <Card>
              <CardHeader>
                <CardTitle>contentFit="cover" (default)</CardTitle>
                <CardDescription>
                  Crops to fill the box. Image extends past edges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  source={{ uri: REMOTE }}
                  style={{ width: "100%", height: 100, borderRadius: 8 }}
                  contentFit="cover"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>contentFit="contain"</CardTitle>
                <CardDescription>
                  Fits inside the box. Letterboxed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  source={{ uri: REMOTE }}
                  style={{ width: "100%", height: 100, borderRadius: 8 }}
                  contentFit="contain"
                />
              </CardContent>
            </Card>
          </View>
        </Section>
      </ScrollView>
    </SafeArea>
  )
}
