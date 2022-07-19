import { useState, useMemo } from 'react'

import {
	Icon, Text, VStack, HStack, FlatList, IconButton
} from 'native-base'

import { Filter } from '../components/filter'
import { Order } from '../components/order'
import { Button } from '../components/button'

import Logo from '../assets/logo_secondary.svg'
import Logout from '../assets/sign-out.svg'
import Desktop from '../assets/desktop-tower.svg'

export function Orders() {
	const [filter, setFilter] = useState<'open'|'closed'>('open')
	const [orders, setOrders] = useState([
		{id:'order-82e8durjew-0707202', patrimony:'883nn292', startedAt:'07/07/2022', closedAt:'12/072022', status:'closed'},
		{id:'order-niaj2e8rij-1907202', patrimony:'jew82jr9', startedAt:'19/07/2022', closedAt:null, status:'open'}
	])

	const filteredOrders = useMemo(()=>{
		return orders.filter(
			(order) => order.status === filter
		)
	},[filter, orders])

	return (
		<VStack
			flex={1}
			w="full"
			bg="gray.600"
			pb={6}
		>
			<HStack
				alignItems="center"
				justifyContent="space-between"
				w="full"
				bg="gray.500"
				pt={12}
				pb={4}
				px={6}
			>
				<Icon as={<Logo />} />
				<IconButton
					size="sm"
					icon={<Logout height={24} width={24} />}
				/>
			</HStack>
			<VStack flex={1} pt={6} px={6}>
				<HStack
					w="full"
					justifyContent="space-between"
				>
					<Text color="white" fontSize="xl">
						All orders
					</Text>
					<Text color="gray.300">
						{orders.length}
					</Text>
				</HStack>
				<HStack w="full" spacing={3} mt={4} mb={8}>
					<Filter
						title="ongoing"
						type="open"
						flex={1}
						isActive={filter === 'open'}
						onPress={()=>setFilter('open')}
					/>

					<Filter
						title="closed"
						type="closed"
						flex={1}
						isActive={filter === 'closed'}
						onPress={()=>setFilter('closed')}
					/>
				</HStack>
				{!filteredOrders.length ? (
					<VStack pt={4} flex={1} alignItems="center">
						<Desktop
							height={128}
							width={128}
						/>
						<Text
							color="gray.300"
							textAlign="center"
							fontSize="xl"
							mt={4}
						>
							You don&apos;t have any {'\n'}
							orders {filter} yet.
						</Text>
					</VStack>
				) : (
					<FlatList
						data={filteredOrders}
						renderItem={({item})=>(
							<Order order={item}/>
						)}
						keyExtractor={(item)=>item.id}
					/>
				)}
			</VStack>
			<HStack px={6} mt={6} w="full" maxW={400} mx="auto">
				<Button
					title="New order"
					mx="auto"
					w="full"
				/>
			</HStack>
		</VStack>
	)
}