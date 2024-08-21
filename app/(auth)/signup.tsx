import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import images from '@/constants/images';
import { Link } from 'expo-router';
import { Input, InputSlot } from '@gluestack-ui/themed';
import { Feather, AntDesign } from '@expo/vector-icons';


interface FormData {
    username: string,
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
    const handleState = () => {
        setShowPassword(!showPassword);
    };
    const onSubmit = (data: FormData) => {
        console.log(data);
        // Handle login logic here
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#161622" barStyle="light-content" />
            <KeyboardAwareScrollView style={{ marginTop: 100 }}>
                <View style={styles.form}>
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={{ width: 115, height: 34 }}

                    />

                    <Text
                        style={{ fontSize: 24, fontWeight: "bold", color: "white", marginTop: 26 }} >
                        Sign Up to Aora
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Username is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Enter a valid username',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.email && styles.inputError]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="username"
                                    autoCapitalize="none"
                                />
                            )}
                            name="username"
                            defaultValue=""
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Enter a valid email address',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={[styles.input, errors.email && styles.inputError]}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            )}
                            name="email"
                            defaultValue=""
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <Controller
                            control={control}
                            rules={{ required: 'Password is required' }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input style={[styles.input, errors.password && styles.inputError]}>
                                    <InputSlot pr="$5" onPress={handleState}>
                                        {showPassword ? (
                                            <AntDesign name="eyeo" size={24} color="#CDCDE0" />
                                        ) : (
                                            <Feather name="eye-off" size={24} color="#CDCDE0" />
                                        )}
                                    </InputSlot>
                                    <TextInput
                                        secureTextEntry={!showPassword}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        secureTextEntry
                                        autoCapitalize="none"
                                        style={{ width: "100%" }}
                                    />
                                </Input>

                            )}
                            name="password"
                            defaultValue=""
                        />
                        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={{ display: "flex", flex: "row", justifyContent: "center", paddingTop: 15, gap: 2 }}>
                        <Text style={{ fontSize: 20, color: "#CDCDE0", fontVariant: "pregular" }}>
                            Already have an account?
                        </Text>
                        <Link
                            href="/login"
                            style={{ fontSize: "16", fontWeight: "semibold", color: "#FF9C01" }}
                        >
                            Login
                        </Link>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};


export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161622",
        padding: 16,
        justifyContent: 'center',
    },
    form: {
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#161622',
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 26,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#CDCDE0',
        marginBottom: 4,
    },
    input: {
        width: "100%",
        color: "#CDCDE0",
        height: 55,
        borderColor: '#232533',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 8,
        backgroundColor: '#1E1E2D',
    },
    inputError: {
        borderColor: '#FF5A5F',
    },
    errorText: {
        color: '#FF5A5F',
        marginTop: 4,
        fontSize: 12,
    },
    button: {
        height: 55,
        marginTop: 16,
        backgroundColor: '#FF9C01',
        borderRadius: 15,
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonText: {
        marginTop: 5,
        color: '#232533',
        fontSize: 16,
        fontWeight: 'bold',
    },
});