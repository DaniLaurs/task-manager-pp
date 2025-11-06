import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useTasksContext } from '@/contexts/tasks-context';
import type { CreateTaskFormProps, CreateTaskPayload } from '@/interfaces/interfaces';
import { cn } from '@/lib/utils';
import { createNewTask } from '@/routes/create-new-task';
import { images } from '@/utils/images';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from './button';

// 🔹 Validação com Zod
const formSchema = z.object({
  title: z.string().min(3, 'O título precisa ter pelo menos 3 caracteres').max(25),
  description: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  images: z.array(z.string().url()).min(1, 'Associe pelo menos uma imagem'),
});

type FormData = z.infer<typeof formSchema>;

export function CreateTaskForm({ onClose }: CreateTaskFormProps) {
  const { refetchTaskData } = useTasksContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formMethods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      images: [],
    },
  });

  const { handleSubmit, control, reset, getValues } = formMethods;

  // 🔹 Mutation: cria tarefa
  const { mutate: createTaskRequest, isPending, isError } = useMutation<
    unknown,
    AxiosError,
    CreateTaskPayload
  >({
    mutationFn: createNewTask,
    onSuccess: () => {
      toast.success('Tarefa criada com sucesso!');
      reset();
      refetchTaskData?.();
      setErrorMessage(null);
      onClose?.(); // ✅ fecha o modal ao concluir
    },
    onError: (error) => {
      toast.error('Erro ao criar tarefa!');
      setErrorMessage(error.message ?? 'Erro desconhecido');
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    createTaskRequest({ newTask: data });
  };

  const flatImages = React.useMemo(() => {
    return Array.isArray(images[0])
      ? (images as string[][]).flat()
      : (images as unknown as string[]);
  }, []);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 🔸 Campo: Título */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="task-title">Título</FormLabel>
              <FormControl>
                <Input id="task-title" {...field} placeholder="Título da tarefa..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 🔸 Campo: Descrição */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="task-description">Descrição</FormLabel>
              <FormControl>
                <Input id="task-description" {...field} placeholder="Descrição da tarefa..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 🔸 Seleção de imagens (3 colunas + scroll vertical) */}
        <FormField
          control={control}
          name="images"
          render={({ field }) => {
            const selected = field.value || [];
            return (
              <FormItem>
                <FormLabel>Selecione as imagens</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 gap-4 max-h-[300px] overflow-y-auto pr-2">
                    {flatImages.map((image, index) => {
                      const isSelected = selected.includes(image);
                      return (

                        <div
                          key={image}
                          onClick={() =>
                            field.onChange(
                              isSelected
                                ? selected.filter((i) => i !== image)
                                : [...selected, image]
                            )
                          }
                          className={cn(
                            'relative cursor-pointer rounded-md overflow-hidden border-2 transition-colors',
                            isSelected
                              ? 'border-primary border-4'
                              : 'border-gray-300 hover:border-gray-400'
                          )}
                        >
                          <img
                            src={image}
                            alt={`Miniatura ${index + 1}`}
                            className="w-full h-24 object-cover"
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

        {/* 🔸 Botões */}
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={() => reset()}>
            Limpar
          </Button>
          <Button type="submit" disabled={isPending || getValues('images').length === 0}>
            {isPending ? <Loader className="animate-spin" /> : 'Criar Tarefa'}
          </Button>
        </div>

        {/* 🔸 Mensagem de erro */}
        {isError && errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
      </form>
    </FormProvider>
  );
}
