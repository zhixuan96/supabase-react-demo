import { useState } from "react";
import { supabase } from './supabase-client'
import { useToast } from "@chakra-ui/react"
import wx from './weixin-1.6.0'
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
    const toast = useToast();
    const handleSignUp = async email => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signIn({
                // provider: 'twilio',
                phone: phone
                // password: 'some-password'
            });
            if (error) throw error;
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }


    const handleLogin = async email => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.verifyOTP({
                // provider: 'twilio',
                phone: phone,
                token: token,
            });
            if (error) throw error;
            toast({
                title: 'account created',
                position: 'top',
                description: 'verify success',
                status: 'success',
                duration: 5000,
                isClosable: true
            });
        } catch (error) {
            toast({
                title: 'Error',
                position: 'top',
                description: error.error_description || error.message,
                status: 'fail',
                duration: 5000,
                isClosable: true
            });
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
                            send verify code to your phone number below
                        </Text>
                    </Stack>
                    <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                        <Stack spacing={4}>
                            <FormControl id="phone">
                                <FormLabel>Phone number</FormLabel>
                                <Input value={phone} onChange={e => setPhone(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    onClick={e => {
                                        e.preventDefault();
                                        handleSignUp(phone);
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
                                    {loading || 'send code'}
                                </Button>
                                <FormControl id="phone">
                                    <FormLabel>verify code</FormLabel>
                                    <Input value={token} onChange={e => setToken(e.target.value)} />
                                </FormControl>
                                <Button
                                    onClick={e => {
                                        e.preventDefault();
                                        handleLogin(email);
                                    }}
                                    isLoading={loading}
                                    loadingText="Signing in ..."
                                    colorScheme="teal"
                                    variant="outline"
                                    spinnerPlacement="start"
                                    bg={'red.900'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500'
                                    }}
                                >
                                    {loading || 'verify code'}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </div>
    )
}