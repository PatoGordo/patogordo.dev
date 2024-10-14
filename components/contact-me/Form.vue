<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import v from "~/config/validate";
import { Field, ErrorMessage } from "vee-validate";

const { locale } = useI18n();

const contactMeFormSchema = toTypedSchema(
  v.object({
    name: v.string().min(1).max(256),
    email: v.string().email().min(1).max(320),
    subject: v.string().min(1).max(256),
    message: v.string().min(1).max(2048),
  })
);

const contactMeFormInitialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const contactMeForm = useForm({
  validationSchema: contactMeFormSchema,
  keepValuesOnUnmount: true,
  initialValues: contactMeFormInitialValues,
});

const onSubmit = contactMeForm.handleSubmit(async () => {
  await handleSaveContact();
});

const {
  status: contactMeStatus,
  error: contactMeError,
  execute: handleSaveContact,
} = useAsyncData(
  "contactMe",
  async () => {
    await $fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify({
        name: contactMeForm.values?.name,
        email: contactMeForm.values?.email,
        subject: contactMeForm.values?.subject,
        message: contactMeForm.values?.message,
      }),
    });

    nextTick(() => {
      contactMeForm.resetForm();
    });
  },
  { immediate: false }
);

// Change the touched form fields depending on locale
watch(locale, () => {
  Object.keys(contactMeForm.values).forEach((field) => {
    if (contactMeForm.isFieldTouched(field as never)) {
      contactMeForm.validateField(field as never);
    }
  });
});
</script>

<template>
  <form
    @submit="onSubmit"
    class="grid grid-cols-2 place-items-start justify-items-stretch gap-6 w-full max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-stretch"
  >
    <Field v-slot="{ componentField }" name="email">
      <div
        class="flex flex-col items-start justify-center gap-2 w-full"
        v-auto-animate
      >
        <label for="email" class="w-full"
          >{{ $t("contact-me.form.email.label") }} *</label
        >
        <input
          id="email"
          class="w-full py-2 px-4 rounded-lg bg-base-200 border-2 border-base-100"
          type="email"
          :placeholder="$t('contact-me.form.email.placeholder')"
          v-bind="componentField"
          v-model="componentField.modelValue"
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
        <label for="name" class="w-full">
          {{ $t("contact-me.form.name.label") }} *</label
        >
        <input
          id="name"
          class="w-full py-2 px-4 rounded-lg bg-base-200 border-2 border-base-100"
          type="text"
          :placeholder="$t('contact-me.form.name.placeholder')"
          v-bind="componentField"
          v-model="componentField.modelValue"
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
        <label for="subject" class="w-full"
          >{{ $t("contact-me.form.subject.label") }} *</label
        >
        <input
          id="subject"
          class="w-full py-2 px-4 rounded-lg bg-base-200 border-2 border-base-100"
          type="text"
          :placeholder="$t('contact-me.form.subject.placeholder')"
          v-bind="componentField"
          v-model="componentField.modelValue"
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
        <label for="message" class="w-full"
          >{{ $t("contact-me.form.message.label") }} *</label
        >
        <textarea
          id="message"
          class="w-full py-2 px-4 rounded-lg bg-base-200 border-2 border-base-100 resize-y min-h-36"
          type="text"
          :placeholder="$t('contact-me.form.message.placeholder')"
          v-bind="componentField"
          v-model="componentField.modelValue"
          required
          :disabled="contactMeStatus === 'pending'"
        />
        <ErrorMessage name="message" class="text-error-500" />
      </div>
    </Field>

    <div
      v-if="contactMeStatus === 'error'"
      class="bg-red-400/30 rounded-lg w-full p-6 col-span-2"
    >
      <div class="flex flex-row items-center justify-start gap-2 mb-2">
        <Icon name="tabler:info-triangle-filled" class="bg-white" size="24" />
        <span class="font-medium text-white text-lg">{{
          $t("contact-me.form.error.title")
        }}</span>
      </div>

      <span class="text-gray-200"
        >{{ $t("contact-me.form.error.error") }}:
        {{
          (contactMeError?.data as Error)?.message ||
          contactMeError?.message ||
          $t("contact-me.form.error.unknown-error")
        }}</span
      >
    </div>

    <div
      v-if="contactMeStatus === 'success'"
      class="bg-emerald-400/30 rounded-lg w-full p-6 col-span-2"
    >
      <div class="flex flex-row items-center justify-start gap-2 mb-2">
        <Icon name="tabler:circle-check" class="bg-white" size="24" />
        <span class="font-medium text-white text-lg">{{
          $t("contact-me.form.success.title")
        }}</span>
      </div>

      <span class="text-gray-200">{{
        $t("contact-me.form.success.description")
      }}</span>
    </div>

    <span />

    <button
      type="submit"
      class="px-4 py-3 bg-primary-500 text-black font-bold rounded-lg flex items-center justify-center gap-2 max-sm:w-full"
      :disabled="contactMeStatus === 'pending'"
    >
      {{
        contactMeStatus === "pending"
          ? $t("contact-me.form.submiting-text")
          : $t("contact-me.form.submit-text")
      }}

      <Icon
        v-if="contactMeStatus === 'pending'"
        name="line-md:loading-loop"
        size="24"
        class="text-black"
      />
      <Icon name="tabler:mail-forward" size="24" class="text-black" v-else />
    </button>
  </form>
</template>

<style scoped lang="scss">
*:disabled {
  filter: grayscale(0.4);
}
</style>
