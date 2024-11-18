package org.example.voice_ui.logic_layer.controllers.impl;

import lombok.RequiredArgsConstructor;
import org.example.voice_ui.document.Account;
import org.example.voice_ui.document.Score;
import org.example.voice_ui.dto.get.AddScoreDTO;
import org.example.voice_ui.dto.get.GetScoreDTO;
import org.example.voice_ui.logic_layer.controllers.ScoreController;
import org.example.voice_ui.logic_layer.services.ScoreService;
import org.example.voice_ui.mappers.ScoreMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ScoreControllerImpl implements ScoreController {
    private final ScoreService scoreService;
    private final ScoreMapper scoreMapper;

    @Override
    public ResponseEntity<GetScoreDTO> getMyScore() {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = jwt.getClaim("username");
        return ResponseEntity.ok(
                scoreMapper.scoreToGetScoreDTO(
                        scoreService.getScoreByAccount(username)));
    }

    @Override
    public ResponseEntity<Void> addScore(AddScoreDTO score) {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = jwt.getClaim("username");
        scoreService.addScore(new Score(score.score(), username));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<List<GetScoreDTO>> getLeaderboard() {
        return ResponseEntity.ok(
                scoreService.getLeaderboard()
                        .stream()
                        .map(scoreMapper::scoreToGetScoreDTO)
                        .toList());
    }
}
