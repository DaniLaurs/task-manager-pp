/** biome-ignore-all lint/correctness/noUnusedVariables: <> */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useTasksContext } from '@/contexts/tasks-context';
import type { UpdateTaskFormProps } from '@/interfaces/interfaces';
import { cn } from '@/lib/utils';
import { updateTask } from '@/routes/update-task';
import { images } from '@/utils/images';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from './button';

// 🧠 Esquema de validação com Zod
const minCharacteresOfTitle = 3;
const maxCharacteresOfTitle = 25;

const formSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(minCharacteresOfTitle, {
      message: `O título deve ter pelo menos ${minCharacteresOfTitle} caracteres.`,
    })
    .max(maxCharacteresOfTitle, {
      message: `O título deve ter no máximo ${maxCharacteresOfTitle} caracteres.`,
    }),
  description: z
    .string()
    .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' }),
  images: z
    .array(z.string().url())
    .min(1, { message: 'Associe pelo menos uma imagem.' }),
});

type FormData = z.infer<typeof formSchema>;
type UpdateTaskPayload = { updatedTask: FormData };

export function UpdateTaskForm({ task, onClose }: UpdateTaskFormProps) {
  const { refetchTaskData } = useTasksContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 🎯 Configuração do React Hook Form
  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: task.id,
      title: task.title,
      description: task.description,
      images: task.images,
    },
  });

  const { handleSubmit, control, reset, getValues } = formMethods;

  // 🪄 Configuração da mutation
  const {
    mutate: updateTaskRequest,
    isPending,
    isError,
  } = useMutation<unknown, AxiosError, UpdateTaskPayload>({
    mutationFn: updateTask,
    onSuccess: () => {
      toast.success('Tarefa editada com sucesso!');
      reset();
      onClose?.(); // ✅ chama a prop opcionalmente
      setErrorMessage(null);
      refetchTaskData?.();
    },
    onError: error => {
      console.error(error);
      toast.error('Erro ao atualizar tarefa!');
      setErrorMessage(error.message ?? null);
    },
  });

  // 🚀 Envio do formulário
  const onSubmit: SubmitHandler<FormData> = data => {
    updateTaskRequest({ updatedTask: data });
  };

  // 🔁 Prepara lista de imagens
  const flatImages = React.useMemo(() => {
    return Array.isArray(images[0])
      ? (images as string[][]).flat()
      : (images as unknown as string[]);
  }, []);

  return (
    <div className='w-full'>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {/* Título */}
          <FormField
            control={control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='task-title'>Título</FormLabel>
                <FormControl>
                  {/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
                  <Input
                    id='task-title'
                    type='text'
                    placeholder='Título da tarefa...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Descrição */}
          <FormField
            control={control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='task-description'>Descrição</FormLabel>
                <FormControl>
                  {/** biome-ignore lint/correctness/useUniqueElementIds: <> */}
                  <Input
                    id='task-description'
                    type='text'
                    placeholder='Descrição da tarefa'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Seleção de imagens */}
          <FormField
            control={control}
            name='images'
            render={({ field }) => {
              const selected = field.value || [];
              return (
                <FormItem>
                  <FormLabel>Selecione as imagens</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-2 gap-4'>
                      {flatImages.map((image, index) => {
                        const isSelected = selected.includes(image);
                        return (
                          // biome-ignore lint/a11y/noStaticElementInteractions: <>
                          // biome-ignore lint/a11y/useKeyWithClickEvents: <>
                          <div
                            key={image}
                            onClick={() =>
                              field.onChange(
                                isSelected
                                  ? selected.filter(i => i !== image)
                                  : [...selected, image],
                              )
                            }
                            className={cn(
                              'relative cursor-pointer rounded-md overflow-hidden border-2 transition-colors',
                              isSelected
                                ? 'border-primary border-4'
                                : 'border-gray-300 hover:border-gray-400',
                            )}
                          >
                            <img
                              src={image}
                              alt={`Miniatura ${index + 1}`}
                              className='w-full h-24 object-cover'
                            />
                          </div>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Botões */}
          <div className='w-full flex justify-end gap-3'>
            <Button
              type='button'
              variant='secondary'
              className='uppercase'
              onClick={() => reset()}
            >
              Limpar
            </Button>
            <Button
              type='submit'
              className='uppercase font-semibold w-[170px]'
              disabled={isPending || getValues('images').length === 0}
            >
              {isPending ? <Loader className='animate-spin' /> : 'Atualizar'}
            </Button>
          </div>

          {/* Exibe mensagem de erro */}
          {isError && errorMessage && (
            <p className='text-[0.8rem] font-medium text-red-500'>
              {errorMessage || 'Erro ao editar tarefa'}
            </p>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
