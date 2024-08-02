/* eslint-disable no-nested-ternary */
// @ts-nocheck

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useCallback, useState, useTransition } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import * as z from 'zod';

import {
  getOrganizationById,
  getOrganizationByIdOnlyTeam,
  getOrganizationDoubleName,
  newOrganization,
} from '@/actions/Organization';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BlurIn from '@/components/ui/blur-in';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { ConfettiButton } from '@/components/ui/confetti';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import {
  Step,
  type StepItem,
  Stepper,
  useStepper,
} from '@/components/ui/stepper';
import { useUploadThing } from '@/libs/UploadAThing';
import { setSelectedTeam } from '@/redux/team-slice';
import { OrganizationSchema } from '@/schemas';
import { cn } from '@/utils/Helpers';

import { ImageCropper } from './image-cropper';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  state: boolean;
  personal?: boolean;
}

export default function TeamSwitcher({
  className,
  state,
  personal,
}: TeamSwitcherProps) {
  const t = useTranslations('Organization');
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const email = Cookies.get('next-auth.session-email');
  const name = Cookies.get('next-auth.session-name');
  const initials = name
    .match(/(\b\S)?/g)
    .join('')
    .toUpperCase();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getInitials = (name: string) => {
    return name
      .match(/(\b\S)?/g)
      .join('')
      .toUpperCase();
  };

  const { startUpload } = useUploadThing('avatar', {
    onClientUploadComplete: () => {
      toast.success('Avatar updated successfully');
    },
    onUploadError: () => {
      toast.error('Something went wrong');
    },
    onUploadBegin: () => {
      toast.info('Uploading avatar');
    },
  });

  const accept = {
    'image/*': [],
  };

  const [groups, setGroups] = useState(
    personal
      ? [
          {
            label: t('account'),
            teams: [
              {
                label: name,
                picture: `https://avatar.vercel.sh/${initials}.png`,
                value: 'personal',
                role: 'USER',
              },
            ],
          },
          {
            label: t('teams'),
            teams: [],
          },
        ]
      : [
          {
            label: t('teams'),
            teams: [],
          },
        ],
  );

  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: '',
      email,
    },
  });

  const steps = [
    { label: t('label1'), description: t('label1_description') },
    {
      label: t('label2'),
      description: t('label2_description'),
      optional: true,
    },
    // { label: 'Plan', description: 'Team Plan' },
  ] satisfies StepItem[];

  // @ts-ignore
  const dispatch = useDispatch();
  // @ts-ignore
  // eslint-disable-next-line
  const selectedTeam = useSelector((state) => state.team.selectedTeam);

  const FirstFormSchema = z.object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
  });

  const form1 = useForm<z.infer<typeof FirstFormSchema>>({
    resolver: zodResolver(FirstFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const SecondFormSchema = z.object({
    avatar: z.optional(
      z
        .any()
        .refine((file) => {
          return ['image/jpeg', 'image/jpg', 'image/png'].includes(
            file?.[0]?.type,
          );
        }, 'File must be a image')
        .refine((file) => {
          return !file || file?.[0].size <= 1024 * 1024 * 4;
        }, 'File size must be less than 4MB'),
    ),
  });

  const form2 = useForm<z.infer<typeof SecondFormSchema>>({
    resolver: zodResolver(SecondFormSchema),
  });

  function StepperFormActions() {
    const {
      prevStep,
      resetSteps,
      hasCompletedAllSteps,
      isLastStep,
      isOptionalStep,
      activeStep,
    } = useStepper();

    return (
      <div className="flex w-full justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              onClick={
                activeStep === 0 ? () => setShowNewTeamDialog(false) : prevStep
              }
              size="sm"
              variant="secondary"
            >
              {activeStep === 0 ? t('cancel') : t('back')}
            </Button>
            <Button size="sm">
              {isLastStep && form2.getValues('avatar')
                ? t('upload')
                : isLastStep
                  ? t('skip')
                  : isOptionalStep
                    ? t('skip')
                    : t('next')}
            </Button>
          </>
        )}
      </div>
    );
  }

  function FirstStepForm() {
    const { nextStep } = useStepper();

    function onSubmit1(values: z.infer<typeof FirstFormSchema>) {
      getOrganizationDoubleName(values?.name)
        .then((data) => {
          // @ts-ignore
          if (data?.error) {
            // @ts-ignore
            return toast.error(data.error);
          }

          // @ts-ignore
          if (data?.success) {
            form.setValue('name', values.name, { shouldValidate: true });
            nextStep();
            return toast.success(data.success);
          }
          return toast.error('Something went wrong');
        })
        .catch(() => {
          return toast.error('Something went wrong');
        });
    }

    return (
      <Form {...form1}>
        <form onSubmit={form1.handleSubmit(onSubmit1)} className="space-y-6">
          <FormField
            control={form1.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('name_placeholder')} {...field} />
                </FormControl>
                <FormDescription>{t('name_description')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <StepperFormActions />
        </form>
      </Form>
    );
  }

  function SecondStepForm() {
    const { nextStep } = useStepper();

    const onDrop = useCallback(
      (acceptedFiles: FileWithPath[]) => {
        const file = acceptedFiles[0];
        if (!file) {
          toast.error('File size must be less than 4MB');
          return;
        }

        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        form2.setValue('avatar', [fileWithPreview], { shouldValidate: true });
        setDialogOpen(true);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept,
    });

    // eslint-disable-next-line consistent-return
    async function onSubmit2(values: z.infer<typeof SecondFormSchema>) {
      if (values.avatar) {
        const res = await startUpload(values.avatar);
        form.setValue('picture', res[0].url, { shouldValidate: true });
        nextStep();
        form2.reset();
        return toast.success('Picture added!');
      }
      nextStep();
      return toast.info('Profile picture skipped!');
    }

    return (
      <Form {...form2}>
        <form onSubmit={form2.handleSubmit(onSubmit2)} className="space-y-6">
          <div className="flex justify-center">
            {form2.getValues('avatar') ? (
              <ImageCropper
                dialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen}
                selectedFile={form2.getValues('avatar')[0]}
                setSelectedFile={(file) =>
                  form2.setValue('avatar', [file], {
                    shouldValidate: true,
                  })
                }
              />
            ) : (
              <Avatar
                {...getRootProps()}
                className="size-36 cursor-pointer ring-2 ring-border ring-offset-2 ring-offset-white dark:ring-offset-black"
              >
                <Input {...getInputProps()} />
                <AvatarFallback>Select File</AvatarFallback>
              </Avatar>
            )}
          </div>
          <StepperFormActions />
        </form>
      </Form>
    );
  }

  const onSubmit = (values: z.infer<typeof OrganizationSchema>) => {
    startTransition(() => {
      newOrganization(values)
        .then((data) => {
          // @ts-ignore
          if (data?.error) {
            form.reset();
            // @ts-ignore
            return toast.error(data.error);
          }

          // @ts-ignore
          if (data?.success) {
            form.reset();
            const newTeams = {
              label: data?.list?.name,
              picture: data?.list?.picture,
              value: data?.list?.id,
            };

            // @ts-ignore
            setGroups((prevGroups) =>
              prevGroups.map((group) => {
                if (group.label === t('teams')) {
                  return {
                    ...group,
                    teams: [...group.teams, newTeams],
                  };
                }
                return group;
              }),
            );
            setShowNewTeamDialog(false);
            return toast.success(data.success);
          }
          return toast.error('Something went wrong');
        })
        .catch(() => {
          return toast.error('Something went wrong');
        });
    });
  };

  function MyStepperFooter() {
    const { activeStep, steps: steeps } = useStepper();

    if (activeStep !== steeps.length) return null;

    return (
      <>
        <Card
          // @ts-ignore
          align="center"
        >
          <CardHeader>
            <CardTitle className="text-xl">{t('overview')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Image
                src={form.getValues('picture') || '/logo.svg'}
                alt="logo"
                className="rounded-full border"
                width={200}
                height={200}
              />
              <BlurIn word={form.getValues('name')} className="text-lg" />
            </div>
          </CardContent>
        </Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ConfettiButton
              type="submit"
              disabled={isPending}
              className="w-full capitalize"
            >
              {t('create')}
            </ConfettiButton>
          </form>
        </Form>
      </>
    );
  }

  React.useEffect(() => {
    async function fetchData() {
      const data = personal
        ? await getOrganizationById()
        : await getOrganizationByIdOnlyTeam();
      // @ts-ignore
      setGroups(data);
    }
    fetchData();
  }, [[personal]]);

  return (
    <ResponsiveDialog
      open={showNewTeamDialog}
      onOpenChange={setShowNewTeamDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={t('select_team')}
            className={cn(
              `mx-2 justify-between truncate px-3 text-sm font-medium`,
              className,
            )}
          >
            <Avatar className={`size-5 ${state ? 'mr-2' : ''}`}>
              <AvatarImage
                src={
                  // @ts-ignore
                  selectedTeam.picture
                }
                // @ts-ignore
                alt={`${selectedTeam.label}`}
              />
              <AvatarFallback>{getInitials(selectedTeam.label)}</AvatarFallback>
            </Avatar>
            {state
              ? // @ts-ignore
                selectedTeam.label || name
              : null}
            {state && (
              <CaretSortIcon className="ml-auto size-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[264px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandInput placeholder={`${t('search')}...`} />
              <CommandEmpty>{t('no_team')}</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.teams.map((team) => (
                    <CommandItem
                      key={team.value}
                      onSelect={() => {
                        dispatch(setSelectedTeam(team));
                        setOpen(false);
                      }}
                      className="cursor-pointer text-sm"
                    >
                      <Avatar className="mr-2 size-5">
                        <AvatarImage src={team.picture} alt={`${team.label}`} />
                        <AvatarFallback>
                          {getInitials(team.label)}
                        </AvatarFallback>
                      </Avatar>
                      {team.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto size-4',
                          // @ts-ignore
                          selectedTeam.value === team.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                    className="cursor-pointer"
                  >
                    <PlusCircledIcon className="mr-2 size-5" />
                    {t('create')}
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>{t('dialog_title')}</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {t('dialog_description')}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogBody>
          <div className="flex w-full flex-col gap-4">
            <Stepper
              variant="circle-alt"
              initialStep={0}
              steps={steps}
              responsive
            >
              {steps.map((stepProps, index) => {
                if (index === 0) {
                  return (
                    <Step key={stepProps.label} {...stepProps}>
                      <FirstStepForm />
                    </Step>
                  );
                }
                return (
                  <Step key={stepProps.label} {...stepProps}>
                    <SecondStepForm />
                  </Step>
                );
              })}
              <MyStepperFooter />
            </Stepper>
          </div>
        </ResponsiveDialogBody>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
