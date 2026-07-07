import Backbutton from "@/common/components/Backbutton";
import BlurComponent from "@/common/components/BlurComponent";
import Loading from "@/common/components/loading";
import PopUp from "@/common/components/PopUp";
import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import { useArticles } from "@/modules/articles/hooks/useArticles";
import { ArticleForm } from "@/modules/articles/interfaces/createArticeForm.interface";
import { ArticleSchema } from "@/modules/articles/schema/createArticle.schema";
import { createArticle } from "@/modules/articles/services/axios-articles";
import { useAuthState } from "@/modules/auth/store/authState";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateAfrticleScreen = () => {
  const { width, height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [succes, setSucces] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleForm>({ resolver: zodResolver(ArticleSchema) });

  const { token } = useAuthState();

  const { getAllArticlesQuery } = useArticles(token);

  const onSubmit = handleSubmit(async (data) => {
    const createDate = {
      ...data,
      token,
    };

    setError(null);
    setSucces(false);
    setIsLoading(true);

    try {
      await createArticle(createDate);
      getAllArticlesQuery.refetch();
      setSucces(true);
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  });

  const handleSuccesPress = () => {
    setSucces(false);
    router.navigate("/articles");
  };

  return (
    <>
      <SafeAreaView
        className="flex-1 w-screen h-screen bg-white"
        accessibilityIgnoresInvertColors
      >
        <Backbutton
          position={"top-20 left-6 z-10"}
          onPress={() => router.back()}
        />

        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <View
            className="flex-1 items-center px-6"
            style={{ marginTop: height * 0.08 }}
          >
            <Text className="text-3xl w-full text-start">Crear artículo</Text>

            <View
              className="w-full mt-8"
              style={{ gap: 18, width: width * 0.92 }}
            >
              <Controller
                control={control}
                name="title"
                rules={{ required: "El título es obligatorio" }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TextInput
                      style={[globalStyles.input, { width: width * 0.92 }]}
                      placeholder="Título"
                      value={value}
                      onChangeText={onChange}
                    />
                    {errors.title && (
                      <Text style={styles.errorText}>
                        {errors.title.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="resume"
                rules={{ required: "El resumen es obligatorio" }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TextInput
                      style={[globalStyles.input, { width: width * 0.92 }]}
                      placeholder="Resumen corto"
                      value={value}
                      onChangeText={onChange}
                    />
                    {errors.resume && (
                      <Text style={styles.errorText}>
                        {errors.resume.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="body"
                rules={{ required: "El contenido es obligatorio" }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TextInput
                      style={[styles.textarea, { width: width * 0.92 }]}
                      placeholder="Contenido"
                      value={value}
                      onChangeText={onChange}
                      multiline
                      textAlignVertical="top"
                    />
                    {errors.body && (
                      <Text style={styles.errorText}>
                        {errors.body.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <PrimaryButton
                backGroundColor={globalStyles.colors.primary[600]}
                text={"Crear artículo"}
                textColor="white"
                onPress={onSubmit}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {succes && (
        <>
          <BlurComponent />
          <PopUp
            text="Artículo creado con éxito"
            buttonText="Ok"
            onPress={handleSuccesPress}
          />
        </>
      )}
      {error && (
        <>
          <BlurComponent />
          <PopUp
            warning
            text="El artículo no se ha guardado"
            buttonText="Ok"
            onPress={() => setError(false)}
          />
        </>
      )}
      {isLoading && (
        <>
          <BlurComponent />
          <Loading />
        </>
      )}
    </>
  );
};

export default CreateAfrticleScreen;

const styles = StyleSheet.create({
  textarea: {
    minHeight: 140,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    fontSize: 16,
  },
  errorText: {
    marginTop: 6,
    color: "#D14343",
    fontSize: 13,
  },
});
