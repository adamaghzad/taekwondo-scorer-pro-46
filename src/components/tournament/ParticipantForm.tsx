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
      age: '',
      rank: '',
      team: ''
    }
  });

  const onSubmit = (data: any) => {
    onAddParticipant({
      id: `p-${Date.now()}`,
      ...data,
      weight: parseFloat(data.weight),
      age: parseInt(data.age)
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
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team/Club</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Team or club name" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" placeholder="Age" />
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

        <Button type="submit">Add Participant</Button>
      </form>
    </Form>
  );
};

export default ParticipantForm;