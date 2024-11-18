package org.example.voice_ui.logic_layer.controllers;

import org.example.voice_ui.dto.get.AddScoreDTO;
import org.example.voice_ui.dto.get.GetScoreDTO;
import org.example.voice_ui.util._enum.SecuredRole;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/game/score")
public interface ScoreController {

    @Secured(SecuredRole.ROLE_PLAYER)
    @GetMapping
    ResponseEntity<GetScoreDTO> getMyScore();

    @Secured(SecuredRole.ROLE_PLAYER)
    @PostMapping
    ResponseEntity<Void> addScore(@RequestBody AddScoreDTO score);

    @Secured(SecuredRole.ROLE_PLAYER)
    @GetMapping("/leaderboard")
    ResponseEntity<List<GetScoreDTO>> getLeaderboard();
}
