import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Grid,
  GridItem
} from "@chakra-ui/react"

interface PlaceDetails {
  memo: string
  cost: number
  visitTime: string
}

interface Place {
  kakaoPlaceId: string
  placeName: string
  latitude: number
  longitude: number
  address: string
  placeDetails: PlaceDetails
}

interface Schedule {
  day: number
  places: Place[]
}

interface TravelPlan {
  id?: number
  title: string
  startDate: string
  endDate: string
  region: string
  visible: boolean
  copyAllowed: boolean
  schedules: Schedule[]
  totalCost?: number // Optional because it's calculated on the client side
}

const CheckPage: React.FC = () => {
  const [form, setForm] = useState<TravelPlan>({
    title: "",
    startDate: "",
    endDate: "",
    region: "",
    visible: true,
    copyAllowed: true,
    schedules: []
  })

  const [plans, setPlans] = useState<TravelPlan[]>([])
  const toast = useToast()

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch(
        "https://ke4f765103c24a.user-app.krampoline.com/api/plans?page=0&size=10&sort=id,desc"
      )
      const data = await response.json()
      setPlans(data.data.content)
    }
    fetchPlans()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const totalCost = calculateTotalCost(form.schedules) // Calculate total cost before submission
    const completeForm = { ...form, totalCost }

    try {
      const response = await fetch("https://k903c4c87638da.user-app.krampoline.com/api/plans?memberId=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*"
        },
        body: JSON.stringify(completeForm)
      })
      if (!response.ok) throw new Error("Failed to submit the travel plan")
      const data = await response.json()
      toast({
        title: "Travel Plan Created",
        description: `Plan for ${data.title} has been created successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true
      })
      setPlans([...plans, data]) // Update local state to include the new plan
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true
      })
    }
  }

  const TravelPlanCard = ({ plan }: { plan: TravelPlan }) => (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <Heading fontSize="xl">{plan.title}</Heading>
      <Text mt={4}>Start Date: {plan.startDate}</Text>
      <Text mt={4}>End Date: {plan.endDate}</Text>
      <Text mt={4}>Region: {plan.region}</Text>
      {plan.schedules.map((schedule, idx) => (
        <Box key={idx} mt={4}>
          <Text fontWeight="bold">Day {schedule.day + 1}</Text>
          {schedule.places.map((place, placeIdx) => (
            <Box key={placeIdx} p={3} borderWidth="1px" mt={2}>
              <Text fontWeight="bold">{place.placeName}</Text>
              <Text>Address: {place.address}</Text>
              <Text>Memo: {place.placeDetails.memo}</Text>
              <Text>
                Cost: {place.placeDetails.cost.toLocaleString("ko-KR", { style: "currency", currency: "KRW" })}
              </Text>
              <Text>Visit Time: {place.placeDetails.visitTime}</Text>
            </Box>
          ))}
        </Box>
      ))}
      <Text mt={4} fontSize="lg" fontWeight="bold">
        Total Cost: {calculateTotalCost(plan.schedules).toLocaleString("ko-KR", { style: "currency", currency: "KRW" })}
      </Text>
    </Box>
  )

  const calculateTotalCost = (schedules: Schedule[]): number => {
    return schedules.reduce((total, schedule) => {
      const dailyTotal = schedule.places.reduce((sum, place) => sum + place.placeDetails.cost, 0)
      return total + dailyTotal
    }, 0)
  }

  return (
    <VStack spacing={8}>
      <Box as="form" w="full" p={5} boxShadow="base" rounded="md" onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Start Date</FormLabel>
            <Input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>End Date</FormLabel>
            <Input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Region</FormLabel>
            <Input type="text" value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Create Travel Plan
          </Button>
        </VStack>
      </Box>
      <Heading as="h2" size="xl">
        Travel Plans
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {plans.map((plan, idx) => (
          <GridItem key={idx}>
            <TravelPlanCard plan={plan} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  )
}

export default CheckPage
