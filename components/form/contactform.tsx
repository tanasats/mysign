"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";


function ContactForm() {
  return (
    <>
      <form>
        <div className="flex flex-col gap-3 mb-3">
          <div>
            <Label>Name</Label>
            <Input ></Input>
          </div>
          <div>
            <Label>Email</Label>
            <Input ></Input>
          </div>
          <div>
            <Label>Message</Label>
            <Textarea rows={5}></Textarea>
          </div>
          <div>
            <Button type="submit">Send</Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ContactForm;