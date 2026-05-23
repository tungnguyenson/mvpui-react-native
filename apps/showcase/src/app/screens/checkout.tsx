import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormField,
  Input,
  PinInput,
  Stepper,
} from "@mvp-ui-rn/ui"
import { Stack } from "expo-router"
import { CheckCircle2, ShoppingCart } from "lucide-react-native"
import { useState } from "react"
import { ScrollView, Text, View } from "react-native"

type Item = { id: string; name: string; price: number; qty: number }

const ITEMS: Item[] = [
  { id: "1", name: "Orbit Pro Plan", price: 49, qty: 1 },
  { id: "2", name: "Extra workspace seat", price: 12, qty: 2 },
]

function PriceRow({
  label,
  value,
  bold,
}: {
  label: string
  value: string
  bold?: boolean
}) {
  return (
    <View className="flex-row items-center justify-between py-1.5">
      <Text className={`text-md ${bold ? "text-fg font-semibold" : "text-fg-secondary"}`}>
        {label}
      </Text>
      <Text className={`text-md ${bold ? "text-fg font-semibold" : "text-fg-secondary"}`}>
        {value}
      </Text>
    </View>
  )
}

export default function CheckoutScreen() {
  const [items, setItems] = useState(ITEMS)
  const [cvv, setCvv] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [zip, setZip] = useState("")
  const [card, setCard] = useState("")

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + tax

  const updateQty = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))

  return (
    <View className="flex-1 bg-bg">
      <Stack.Screen options={{ title: "Checkout", headerShown: true }} />
      <ScrollView
        contentContainerClassName="px-5 py-6 gap-6"
        keyboardShouldPersistTaps="handled"
      >
        {/* Order summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            {items.map((item) => (
              <View key={item.id} className="flex-row items-center gap-3">
                <View className="flex-1 gap-0.5">
                  <Text className="text-fg text-md font-medium">{item.name}</Text>
                  <Text className="text-fg-tertiary text-sm">${item.price}/mo</Text>
                </View>
                <Stepper
                  value={item.qty}
                  onChange={(qty) => updateQty(item.id, qty)}
                  min={1}
                  max={10}
                  size="sm"
                />
              </View>
            ))}
            <View className="border-t border-border pt-3 mt-1">
              <PriceRow label="Subtotal" value={`$${subtotal}`} />
              <PriceRow label="Tax (8%)" value={`$${tax}`} />
              <PriceRow label="Total" value={`$${total}/mo`} bold />
            </View>
          </CardContent>
        </Card>

        {/* Shipping */}
        <View className="gap-4">
          <Text className="text-fg text-lg font-semibold">Shipping Address</Text>
          <FormField label="Street">
            <Input
              placeholder="123 Main St"
              value={street}
              onChangeText={setStreet}
              autoComplete="street-address"
            />
          </FormField>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <FormField label="City">
                <Input
                  placeholder="San Francisco"
                  value={city}
                  onChangeText={setCity}
                />
              </FormField>
            </View>
            <View className="w-28">
              <FormField label="ZIP">
                <Input
                  placeholder="94105"
                  value={zip}
                  onChangeText={setZip}
                  keyboardType="number-pad"
                />
              </FormField>
            </View>
          </View>
        </View>

        {/* Payment */}
        <View className="gap-4">
          <Text className="text-fg text-lg font-semibold">Payment</Text>
          <FormField label="Card number">
            <Input
              placeholder="•••• •••• •••• ••••"
              value={card}
              onChangeText={setCard}
              keyboardType="number-pad"
              autoComplete="cc-number"
            />
          </FormField>
          <FormField label="CVV (3 digits)">
            <PinInput
              length={3}
              value={cvv}
              onChangeText={setCvv}
              secureTextEntry
              keyboardType="number-pad"
            />
          </FormField>
        </View>

        {/* Submit */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" iconLeading={ShoppingCart}>
              Place Order — ${total}/mo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <View className="w-12 h-12 rounded-full bg-success-bg items-center justify-center self-center mb-2">
                <CheckCircle2 size={24} color="#16a34a" />
              </View>
              <DialogTitle>Order placed!</DialogTitle>
              <DialogDescription>
                Your subscription starts today. You'll receive a confirmation email shortly.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ScrollView>
    </View>
  )
}
