<?php

namespace App\Ai;

use App\Ai\Agents\KoperaAgent;
use App\Models\User;
use App\Services\KoperaAiService;

class KoperaRuntime
{
    public function __construct(private readonly KoperaAiService $service) {}

    public function handle(string $phoneNumber, string $message): string
    {
        $this->agentFor($phoneNumber);

        return $this->service->handleIncomingMessage($phoneNumber, $message);
    }

    public function handleForUser(User $user, string $message): string
    {
        $freshUser = User::query()->find($user->id) ?? $user;
        $phoneNumber = (string) ($freshUser->phone_number ?? $freshUser->email);

        $this->agentFor($phoneNumber);

        return $this->service->handleIncomingMessage($phoneNumber, $message);
    }

    public function agentFor(string $phoneNumber): KoperaAgent
    {
        $cooperativeId = User::query()
            ->where('phone_number', $phoneNumber)
            ->value('cooperative_id');

        return new KoperaAgent($phoneNumber, $cooperativeId ? (int) $cooperativeId : null);
    }
}
