<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import v from "~/config/validate";
import { Field, Form, ErrorMessage } from "vee-validate";

const contactMeFormSchema = toTypedSchema(
  v.object({
    name: v.string().min(1).max(256),
    email: v.string().email().min(1).max(320),
    subject: v.string().min(1).max(256),
    message: v.string().min(1).max(2048),
  })
);

const contactMeForm = useForm({
  validationSchema: contactMeFormSchema,
});

const onSubmit = contactMeForm.handleSubmit(async () => {
  await handleSaveContact();
});

const {
  status: contactMeStatus,
  error: contactMeError,
  execute: handleSaveContact,
} = useAsyncData("contactMe", async () => null, { immediate: false });
</script>

<template>
  <form
    @submit="onSubmit"
    class="grid grid-cols-2 place-items-start justify-items-stretch gap-6 w-full max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-stretch"
  >
    <Field v-slot="{ componentField, meta }" name="email">
      <div
        class="flex flex-col items-start justify-center gap-2 w-full"
        v-auto-animate
      >
        <label for="email" class="w-full">Email *</label>
        <input
          id="email"
          class="w-full py-2 px-4 rounded-lg bg-base-200 border-2 border-base-100"
          type="email"
          placeholder="Seu email"
          v-bind="componentField"
          required
          :disabled="contactMeStatus === 'pending'"
        />
        <ErrorMessage name="email" class="text-error-500" />
      </div>
    </Field>

    <Field v-slot="{ componentField }" name="name">
      <div
        class="flex flex-col items-start justify-center gap-2 w-full"
        v-auto-animate
      >
        <label for="name" class="w-full">Nome *</label>
        <input
          id="name"
          class="w-full py-2 px-4 rounded-lg bg-base-200 border-2 border-base-100"
          type="text"
          placeholder="Seu nome"
          v-bind="componentField"
          required
          :disabled="contactMeStatus === 'pending'"
        />
        <ErrorMessage name="name" class="text-error-500" />
      </div>
    </Field>

    <Field v-slot="{ componentField }" name="subject">
      <div
        class="flex flex-col items-start justify-center gap-2 w-full col-span-2"
        v-auto-animate
      >
        <label for="subject" class="w-full">Assunto *</label>
        <input
          id="subject"
          class="w-full py-2 px-4 rounded-lg bg-base-200 border-2 border-base-100"
          type="text"
          placeholder="Assunto"
          v-bind="componentField"
          r
          required
          :disabled="contactMeStatus === 'pending'"
        />
        <ErrorMessage name="subject" class="text-error-500" />
      </div>
    </Field>

    <Field v-slot="{ componentField }" name="message">
      <div
        class="flex flex-col items-start justify-center gap-2 w-full col-span-2"
        v-auto-animate
      >
        <label for="message" class="w-full">Sua mensagem *</label>
        <textarea
          id="message"
          class="w-full py-2 px-4 rounded-lg bg-base-200 border-2 border-base-100 resize-y min-h-36"
          type="text"
          placeholder="Sua mensagem"
          v-bind="componentField"
          required
          :disabled="contactMeStatus === 'pending'"
        />
        <ErrorMessage name="message" class="text-error-500" />
      </div>
    </Field>

    <span />

    <button
      type="submit"
      class="px-4 py-3 bg-primary-500 text-black font-bold rounded-lg flex items-center justify-center gap-2 max-sm:w-full"
    >
      Enviar mensagem
      <Icon name="tabler:mail-forward" size="24" class="text-black" />
    </button>
  </form>
</template>
