package org.example.voice_ui.logic_layer.controllers.impl;

import lombok.RequiredArgsConstructor;
import org.example.voice_ui.document.Account;
import org.example.voice_ui.document.Score;
import org.example.voice_ui.dto.get.GetScoreDTO;
import org.example.voice_ui.logic_layer.controllers.ScoreController;
import org.example.voice_ui.logic_layer.services.ScoreService;
import org.example.voice_ui.mappers.ScoreMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ScoreControllerImpl implements ScoreController {
    private final ScoreService scoreService;
    private final ScoreMapper scoreMapper;

    @Override
    public ResponseEntity<GetScoreDTO> getMyScore() {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(
                scoreMapper.scoreToGetScoreDTO(
                        scoreService.getScoreByAccount(account.getUsername())));
    }

    @Override
    public ResponseEntity<Void> addScore(Integer score) {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        scoreService.addScore(new Score(score,account.getUsername()));
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
