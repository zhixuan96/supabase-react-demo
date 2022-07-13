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
    const [account, setAccount] = useState('');
    const [token, setToken] = useState('');
    const toast = useToast();
    const handleSignUp = async account => {
        try {
            setLoading(true);
            if (isEmail(account)) {
                const { error } = await supabase.auth.signIn({
                    email: account
                });if(error)throw error;
            } else {
                const { error } = await supabase.auth.signIn({
                    phone: account
                });if(error)throw error;
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }


    const handleLogin = async account => {
        try {
            setLoading(true);
            if (isEmail(account)) {
                const { error } = await supabase.auth.verifyOTP({
                    email: account,
                    token: token,
                    type: 'magiclink'
                });if(error)throw error;
            } else {
                const { error } = await supabase.auth.verifyOTP({
                    phone: account,
                    token: token,
                });if(error)throw error;
            }

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
                            <FormControl id="account">
                                <FormLabel>account</FormLabel>
                                <Input value={account} onChange={e => setAccount(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    onClick={e => {
                                        e.preventDefault();
                                        handleSignUp(account);
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
                                        handleLogin(account);
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
function isEmail(email) {
    var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    if (!regex.test(email)) {
        return false;
    }
    return true;
}