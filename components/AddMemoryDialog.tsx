"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Memory } from "@/lib/types";

const TAG_OPTIONS = ["甜蜜", "浪漫", "温馨", "搞笑", "感动"];

interface AddMemoryFormValues {
  title: string;
  date: string;
  content: string;
  location: string;
  tag: string;
}

interface AddMemoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (memory: Memory) => void;
}

export function AddMemoryDialog({
  open,
  onOpenChange,
  onAdd,
}: AddMemoryDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddMemoryFormValues>({
    defaultValues: {
      title: "",
      date: "",
      content: "",
      location: "",
      tag: "甜蜜",
    },
  });

  const tagValue = watch("tag");

  const onSubmit = (data: AddMemoryFormValues) => {
    const dateFormatted = data.date.replace(/-/g, ".");
    const memory: Memory = {
      date: dateFormatted,
      title: data.title,
      content: data.content,
      location: data.location || undefined,
      tag: data.tag,
    };
    onAdd(memory);
    reset();
    toast.success("回忆添加成功！");
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[600px] font-serif bg-typewriter-paper border-typewriter-border text-typewriter-ink typewriter-paper">
        <DialogHeader>
          <DialogTitle className="font-serif text-typewriter-ink text-2xl">
            添加回忆
          </DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              className="rounded-md p-1 text-typewriter-ink/60 hover:text-typewriter-ink transition-colors"
              aria-label="关闭"
            >
              <X className="h-6 w-6" />
            </button>
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label
              htmlFor="memoryTitle"
              className="text-typewriter-ink font-serif"
            >
              标题
            </Label>
            <Input
              id="memoryTitle"
              {...register("title", { required: "请输入标题" })}
              className="mt-2 border-typewriter-border bg-typewriter-paper text-typewriter-ink font-serif focus:ring-typewriter-accent"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="memoryDate"
              className="text-typewriter-ink font-serif"
            >
              日期
            </Label>
            <Input
              id="memoryDate"
              type="date"
              {...register("date", { required: "请选择日期" })}
              className="mt-2 border-typewriter-border bg-typewriter-paper text-typewriter-ink font-serif focus:ring-typewriter-accent"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="memoryContent"
              className="text-typewriter-ink font-serif"
            >
              回忆
            </Label>
            <Textarea
              id="memoryContent"
              {...register("content", { required: "请写下回忆内容" })}
              className="mt-2 min-h-[120px] border-typewriter-border bg-typewriter-paper text-typewriter-ink font-serif focus:ring-typewriter-accent"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="memoryLocation"
              className="text-typewriter-ink font-serif"
            >
              地点
            </Label>
            <Input
              id="memoryLocation"
              {...register("location")}
              className="mt-2 border-typewriter-border bg-typewriter-paper text-typewriter-ink font-serif focus:ring-typewriter-accent"
            />
          </div>
          <div>
            <Label className="text-typewriter-ink font-serif">标签</Label>
            <Select
              value={tagValue}
              onValueChange={(v) => setValue("tag", v)}
              required
            >
              <SelectTrigger className="mt-2 border-typewriter-border bg-typewriter-paper text-typewriter-ink font-serif">
                <SelectValue placeholder="选择标签" />
              </SelectTrigger>
              <SelectContent className="bg-typewriter-paper border-typewriter-border">
                {TAG_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt}
                    value={opt}
                    className="font-serif text-typewriter-ink"
                  >
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              className="flex-1 bg-typewriter-accent hover:bg-typewriter-accent/90 text-typewriter-paper font-serif border-typewriter-border"
            >
              保存
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1 border-typewriter-border bg-typewriter-paper text-typewriter-ink font-serif hover:bg-typewriter-bg"
              onClick={() => handleOpenChange(false)}
            >
              取消
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
