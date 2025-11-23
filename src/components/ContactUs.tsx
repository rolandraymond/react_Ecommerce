import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import type { Value} from "react-phone-number-input";


const schema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .nonempty("Email is required"),

firstName: z
  .string()
  .min(2, "First name must be at least 2 characters")
  .max(50, "First name must be less than 50 characters")
  .regex(/^[A-Za-z]+$/, "First name must contain only letters")
  .nonempty("First name is required"),

lastName: z
  .string()
  .min(2, "Last name must be at least 2 characters")
  .max(50, "Last name must be less than 50 characters")
  .regex(/^[A-Za-z]+$/, "Last name must contain only letters")
  .nonempty("Last name is required"),

  phone: z.string().optional(),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message cannot exceed 500 characters"),
});

type FormData = z.infer<typeof schema>;

function ContactUs() {
 const [phoneValue, setPhoneValue] = useState<Value | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    alert("Message sent successfully! We will get to you soon.");
    reset();
    setPhoneValue(undefined);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* First + Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="w-full border p-2 rounded"
              type="text"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="w-full border p-2 rounded"
              type="text"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Email Address
          </label>
          <input
            {...register("email")}
            className="w-full border p-2 rounded"
            type="email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Phone Number (optional)
          </label>
          <PhoneInput
            defaultCountry="EG"
            placeholder="Enter phone number"
            value={phoneValue}
            onChange={setPhoneValue}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Message
          </label>
          <textarea
            {...register("message")}
            className="w-full border p-2 rounded h-32"
          ></textarea>
          {errors.message && (
            <p className="text-red-600 text-sm">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
