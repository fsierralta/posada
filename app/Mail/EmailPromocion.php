<?php

namespace App\Mail;


use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;
class EmailPromocion extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public  $sendDataMail;
    public function __construct($sendDataMail)

    {
        //
        $this->sendDataMail=$sendDataMail;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Promocion opticas Myoptic',
            from: new Address('gerencia@posadaloshumacos.com','Optica MyOptic')
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'promocion.promocion',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
