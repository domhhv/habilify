import { createCalendarEvent } from '@actions';
import { CalendarEventsContext, HabitsContext } from '@context';
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  Option,
  Select,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/joy';
import { format } from 'date-fns';
import React, { FormEventHandler } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  date: Date | null;
};

export default function DayHabitModalDialog({ open, onClose, date }: Props) {
  const { habits } = React.useContext(HabitsContext);
  const { setCalendarEvents } = React.useContext(CalendarEventsContext);
  const [submitting, setSubmitting] = React.useState(false);
  const [selectedBadHabit, setSelectedBadHabit] = React.useState<number | null>(
    null
  );

  if (!date || !open) {
    return null;
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!selectedBadHabit) {
      return null;
    }

    setSubmitting(true);
    try {
      const newCalendarEvent = await createCalendarEvent(
        date,
        selectedBadHabit as number
      );
      setCalendarEvents((prevCalendarEvents) => [
        ...prevCalendarEvents,
        newCalendarEvent,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
    onClose();
  };

  const handleSelect = (_: null, newValue: string) => {
    setSelectedBadHabit(Number(newValue));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ width: 380 }}>
        <ModalClose />
        <DialogTitle>
          Add habits for {format(date, 'iii, LLL d, y')}
        </DialogTitle>
        <DialogContent>Select from the habits provided below</DialogContent>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel id="habit-select-label" htmlFor="habit-select">
              Select Habit
            </FormLabel>
            <Select
              required
              color={'neutral'}
              placeholder="Select Habit"
              value={habits.length ? selectedBadHabit : 0}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onChange={handleSelect}
              disabled={submitting}
              id="habit-select"
            >
              {!habits.length && (
                <Option value={0} label="No habits found" disabled>
                  No habits found
                </Option>
              )}
              {habits.map((habit) => (
                <Option key={habit.id} value={habit.id} label={habit.name}>
                  {habit.name}
                  <Typography level="body-xs">{habit.trait}</Typography>
                </Option>
              ))}
            </Select>
            {!habits.length && (
              <FormHelperText id="select-field-demo-helper">
                Add a habit or some first
              </FormHelperText>
            )}
          </FormControl>
          <Box mt={1}>
            <Button
              fullWidth
              loading={submitting}
              disabled={!habits.length}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      </ModalDialog>
    </Modal>
  );
}
