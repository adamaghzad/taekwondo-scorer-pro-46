import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

interface ParticipantFormProps {
  onAddParticipant: (participant: any) => void;
}

const ParticipantForm = ({ onAddParticipant }: ParticipantFormProps) => {
  const form = useForm({
    defaultValues: {
      name: '',
      weight: '',
      rank: '',
      category: ''
    }
  });

  const onSubmit = (data: any) => {
    onAddParticipant({
      id: `p-${Date.now()}`,
      ...data,
      weight: parseFloat(data.weight)
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Participant name" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg)</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.1" placeholder="Weight in kg" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rank</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rank" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1st Dan">1st Dan</SelectItem>
                  <SelectItem value="2nd Dan">2nd Dan</SelectItem>
                  <SelectItem value="3rd Dan">3rd Dan</SelectItem>
                  <SelectItem value="4th Dan">4th Dan</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Flyweight">Flyweight (-58kg)</SelectItem>
                  <SelectItem value="Featherweight">Featherweight (-68kg)</SelectItem>
                  <SelectItem value="Lightweight">Lightweight (-80kg)</SelectItem>
                  <SelectItem value="Heavyweight">Heavyweight (+80kg)</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit">Add Participant</Button>
      </form>
    </Form>
  );
};

export default ParticipantForm;