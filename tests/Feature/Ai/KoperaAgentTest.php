<?php

namespace Tests\Feature\Ai;

use App\Ai\Agents\KoperaAgent;
use Tests\TestCase;

class KoperaAgentTest extends TestCase
{
    public function test_it_exposes_the_kopera_system_prompt(): void
    {
        $agent = new KoperaAgent('6281234567890', 12);

        $instructions = $agent->instructions();

        $this->assertStringContainsString('Kamu adalah KOPERA', $instructions);
        $this->assertStringContainsString('check_product_stock', $instructions);
        $this->assertStringContainsString('get_user_context', $instructions);
        $this->assertStringContainsString('is_secret_ballot = true', $instructions);
    }

    public function test_it_returns_the_expected_agent_configuration(): void
    {
        config()->set('ai.fallback_mode', true);
        config()->set('ai.agent.provider', 'gemini');
        config()->set('ai.agent.temperature', 0.3);
        config()->set('ai.agent.max_tokens', 1024);
        config()->set('ai.agent.max_steps', 5);
        config()->set('ai.agent.timeout', 30);

        $agent = new KoperaAgent('6281234567890', null);

        $configuration = $agent->configuration();

        $this->assertSame('6281234567890', $configuration['whatsapp_number']);
        $this->assertNull($configuration['cooperative_id']);
        $this->assertTrue($configuration['fallback_mode']);
        $this->assertSame('gemini', $configuration['agent']['provider']);
        $this->assertSame(0.3, $configuration['agent']['temperature']);
        $this->assertSame(1024, $configuration['agent']['max_tokens']);
        $this->assertSame(5, $configuration['agent']['max_steps']);
        $this->assertSame(30, $configuration['agent']['timeout']);
    }
}
