import type { Meta, StoryObj } from '@storybook/react'
import { number, text, withKnobs } from '@storybook/addon-knobs'
import { Spinner as SpinnerUI } from '@/components/ui/spinner'

const meta = {
  title: 'ui/spinner',
  component: SpinnerUI,
  decorators: [withKnobs],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    className: text('class', ''),
    size: number('size', 36),
  },
} satisfies Meta<typeof SpinnerUI>

export default meta

type Story = StoryObj<typeof meta>

export const Spinner: Story = {}

export function KnobsSpinner() {
  return (
    <SpinnerUI
      className={text('class', '')}
      size={number('size', 36)}
    />
  )
}
