import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RadioGroup } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SquareChartGantt, Ticket, Users, User, CheckIcon } from "lucide-react";
const branches = [
  "CSE",
  "ECE",
  "MECH",
  "CIVIL",
  "CSE-IOT",
  "CSE-AIML",
  "MBA",
  "EEE",
];
const projectTypeOptions = {
  "Project Expo": [0, 1, 2, 3],
  "Technical Quiz": [0, 1, 2],
  "Paper Presentation": [0, 1],
  "Poster Presentation": [0, 1],
  "Coding Contest": [0, 1],
  Circuitrix: [0],
};
const events = [
  "Paper Presentation",
  "Poster Presentation",
  "Circuitrix",
  "Coding Contest",
  "Technical Quiz",
  "Project Expo",
];

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits." }),
    email: z.string().email({ message: "Invalid email address." }),
    eventName: z.enum(events, {
      errorMap: () => ({ message: "Please select an event." }),
    }),
    branchName: z.enum(branches, {
      errorMap: () => ({ message: "Please select a branch." }),
    }),
    duNumber: z.string().regex(/^DU[A-Z][1-9][0-9]{6}$/, {
      message:
        "DU number must be in the format DU(one letter)(7 digits from 1-9)",
    }),
    confirmDuNumber: z
      .string()
      .min(1, { message: "Please confirm your DU Number." }),
    participants: z.enum([0, 1, 2, 3]),
    participantDetails: z
      .array(
        z.object({
          name: z.string().min(2, {
            message: "Participant name must be at least 2 characters.",
          }),
        })
      )
      .optional(),
  })
  .refine((data) => data.duNumber === data.confirmDuNumber, {
    message: "DU Numbers do not match",
    path: ["confirmDuNumber"],
  });

const RegisterPage = () => {
  const [step, setStep] = React.useState(1);
  const [projectType, setProjectType] = useState("");

  const handleProjectTypeChange = (value) => {
    setProjectType(value);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      eventName: "",
      branchName: "",
      duNumber: "",
      confirmDuNumber: "",
      participants: "0",
      participantDetails: [],
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  const steps = [
    { title: "Personal Information", icon: User },
    { title: "Event Details", icon: SquareChartGantt },
    { title: "DU Number", icon: Ticket },
    { title: "Participants", icon: Users },
  ];

  const isStepValid = () => {
    switch (step) {
      case 1: {
        // Step 1: Check if name, phone, and email are valid
        const fields = ["name", "phone", "email"];
        return fields.every((field) => {
          const fieldState = form.getFieldState(field);
          return fieldState.isDirty && !fieldState.invalid;
        });
      }

      case 2: {
        // Step 2: Check if eventName and branchName are valid
        const fields = ["eventName", "branchName"];
        return fields.every((field) => {
          const fieldState = form.getFieldState(field);
          return fieldState.isDirty && !fieldState.invalid;
        });
      }

      case 3: {
        // Step 3: Check if duNumber and confirmDuNumber are valid and match
        const duNumberState = form.getFieldState("duNumber");
        const confirmDuNumberState = form.getFieldState("confirmDuNumber");
        const isValid =
          duNumberState.isDirty &&
          !duNumberState.invalid &&
          confirmDuNumberState.isDirty &&
          !confirmDuNumberState.invalid;
        const doNumbersMatch =
          duNumberState.value === confirmDuNumberState.value;
        return isValid && doNumbersMatch;
      }

      case 4: {
        const participantsCount = form.getFieldState("participants").value;

        // Validate that participantsCount is a valid number and within a reasonable range
        if (isNaN(participantsCount) || participantsCount < 0) {
          return false;
        }
        if (participantsCount === 0) {
          return true;
        }
        const isRadioSelected =
          form.getFieldState("participants").isDirty &&
          !form.getFieldState("participants").invalid;
        const areParticipantDetailsValid = [...Array(participantsCount)].every(
          (_, index) => {
            const nameState = form.getFieldState(
              `participantDetails.${index}.name`
            );
            return nameState.isDirty && !nameState.invalid;
          }
        );

        return isRadioSelected && areParticipantDetailsValid;
      }

      default:
        return false;
    }
  };

  const handleNext = async () => {
    const isValid = await form.trigger(
      step === 1
        ? ["name", "phone", "email"]
        : step === 2
        ? ["eventName", "branchName"]
        : step === 3
        ? ["duNumber", "confirmDuNumber"]
        : ["participants"]
    );

    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4 flex-col gap-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold mb-5">
            {steps[step - 1].title}
          </CardTitle>
          <div className="flex justify-between items-center mt-4">
            {steps.map((s, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl
                                 ${
                                   index + 1 < step
                                     ? "bg-green-500"
                                     : index + 1 === step
                                     ? "bg-white text-primary"
                                     : "bg-white text-primary"
                                 }`}
                >
                  {index + 1 < step ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    React.createElement(s.icon)
                  )}
                </div>
                <div className="text-xs mt-1">{s.title}</div>
              </div>
            ))}
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-7">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                placeholder=""
                                {...field}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-800 bg-transparent rounded-lg border-[0.1rem] border-gray-300 appearance-none focus:outline-none focus-visible:ring-0 focus:border-primary peer"
                              />
                            </FormControl>
                            <FormLabel className="absolute text-sm text-gray-500 duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/4  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                              Name
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                placeholder=""
                                {...field}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-800 bg-transparent rounded-lg border-[0.1rem] border-gray-300 appearance-none focus:outline-none focus-visible:ring-0 focus:border-primary peer"
                              />
                            </FormControl>
                            <FormLabel className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/4  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                              Phone Number
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                placeholder=""
                                type="email"
                                {...field}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-800 bg-transparent rounded-lg border-[0.1rem] border-gray-300 appearance-none focus:outline-none focus-visible:ring-0 focus:border-primary peer"
                              />
                            </FormControl>
                            <FormLabel className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/4  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                              Email
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <>
                      <FormField
                        control={form.control}
                        name="eventName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event</FormLabel>
                            <Select
                              onValueChange={(e) => {
                                field.onChange(e);
                                handleProjectTypeChange(e);
                              }}
                              defaultValue={field.value}
                            >
                              {console.log(projectType)}
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Event" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {events.map((event) => (
                                  <SelectItem key={event} value={event}>
                                    {event}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="branchName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Branch</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Branch" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {branches.map((branch) => (
                                  <SelectItem key={branch} value={branch}>
                                    {branch}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {step === 3 && (
                    <div className="space-y-7">
                      <FormField
                        control={form.control}
                        name="duNumber"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                placeholder=""
                                {...field}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-800 bg-transparent rounded-lg border-[0.1rem] border-gray-300 appearance-none focus:outline-none focus-visible:ring-0 focus:border-primary peer"
                              />
                            </FormControl>
                            <FormLabel className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/4  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                              DU Number
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmDuNumber"
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                placeholder=""
                                {...field}
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-800 bg-transparent rounded-lg border-[0.1rem] border-gray-300 appearance-none focus:outline-none focus-visible:ring-0 focus:border-primary peer"
                              />
                            </FormControl>
                            <FormLabel className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/4  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                              Confirm DU Number
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 4 && (
                    <>
                      <FormField
                        control={form.control}
                        name="participants"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Number of Participants</FormLabel>
                            <FormControl>
                              <RadioGroup
                                value={field.value}
                                onChange={field.onChange}
                                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                              >
                                {projectTypeOptions[projectType].map(
                                  (value) => (
                                    <RadioGroup.Option
                                      key={value}
                                      value={value}
                                      className={({ active, checked }) =>
                                        `${
                                          active
                                            ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                                            : ""
                                        }
                                      ${
                                        checked
                                          ? "bg-primary bg-opacity-75 text-white"
                                          : "bg-white"
                                      }
                                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                              <div className="text-sm">
                                                <RadioGroup.Label
                                                  as="p"
                                                  className={`font-medium  ${
                                                    checked
                                                      ? "text-white"
                                                      : "text-gray-900"
                                                  }`}
                                                >
                                                  {value === 0
                                                    ? "Only Me"
                                                    : `${value} participant${
                                                        value !== "1" ? "s" : ""
                                                      }`}
                                                </RadioGroup.Label>
                                              </div>
                                            </div>
                                            {checked && (
                                              <div className="shrink-0 text-white">
                                                <CheckIcon className="h-6 w-6" />
                                              </div>
                                            )}
                                          </div>
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  )
                                )}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("participants") !== 0 && (
                        <div className="mt-6 space-y-7">
                          {[...Array(Number(form.watch("participants")))].map(
                            (_, index) => (
                              <div
                                key={index}
                                className="bg-white p-4 rounded-lg border-primary border"
                              >
                                <h3 className="font-semibold mb-2">
                                  Participant {index + 1}
                                </h3>
                                <FormField
                                  control={form.control}
                                  name={`participantDetails.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem className="relative">
                                      <FormControl>
                                        <Input
                                          placeholder=""
                                          {...field}
                                          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-800 bg-transparent rounded-lg border-[0.1rem] border-gray-300 appearance-none focus:outline-none focus-visible:ring-0 focus:border-primary peer"
                                        />
                                      </FormControl>
                                      <FormLabel className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/4  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                                        Name
                                      </FormLabel>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50 rounded-b-lg">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={handlePrevious}
                  variant="outline"
                >
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-primary text-white"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isStepValid()}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                >
                  Submit
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
