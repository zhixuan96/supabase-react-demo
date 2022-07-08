import { useState } from "react";
import { supabase } from './supabase-client'
import { useToast } from "@chakra-ui/react"
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Heading
} from '@chakra-ui/react';
export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const handleSignUp = async email => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            if (error) throw error;
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    const handleSignIn = async email => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signIn({
                email: email,
                password: password,
            });
            if (error) throw error;
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to supabase</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            signup with email
                        </Text>
                    </Stack>
                    <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>email address</FormLabel>
                                <Input value={email} onChange={e => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password">
                                    <FormLabel>password</FormLabel>
                                    <Input value={password} onChange={e => setPassword(e.target.value)} />
                                </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    onClick={e => {
                                        e.preventDefault();
                                        handleSignUp(email,password);
                                    }}
                                    isLoading={loading}
                                    loadingText="Signing in ..."
                                    colorScheme="teal"
                                    variant="outline"
                                    spinnerPlacement="start"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500'
                                    }}
                                >
                                    {loading || 'rigister'}
                                </Button>
                                <Button
                                    onClick={e => {
                                        e.preventDefault();
                                        handleSignIn(email,password);
                                    }}
                                    isLoading={loading}
                                    loadingText="Signing in ..."
                                    colorScheme="teal"
                                    variant="outline"
                                    spinnerPlacement="start"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500'
                                    }}
                                >
                                    {loading || 'login'}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    )
}